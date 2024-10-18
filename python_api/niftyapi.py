from flask import Flask, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

# Enable CORS to allow cross-origin requests from the client
CORS(app, origins=["http://localhost:5173"])  # Adjust origin if necessary

# Dictionary to hold stock symbols and corresponding stock names
stock_data = {
    "nifty-50-index-.NSEI": "Nifty 50",
    "nifty-midcap-100-index-.NIFMDCP100": "Nifty 100 Midcap",
    "nifty-100-index-.NIFTY100": "Nifty 100 Largecap",
    "nifty-bank-index-.NSEBANK": "Nifty Bank",
    "nifty-it-index-.NIFTYIT": "Nifty IT",
    "niftysm100-.NIFSMCP100": "Nifty 100 Smallcap",
    "nifty-pharma-index-.NIPHARM": "Nifty Pharma",
}

# Function to fetch the Sensex share amount
def fetch_sensex_share_amount():
    url = 'https://www.icicidirect.com/equity/index/bse/bse-sensex/20558'
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        share_amount = soup.find('p', class_='share_amt mb-0')
        
        if share_amount:
            return share_amount.text.strip()
    return None

# Function to fetch stock data from a URL and extract price, bracketed change, and calculate percentage change
def fetch_stock_data(stock_symbol):
    url = f"https://www.tickertape.in/stocks/{stock_symbol}"
    response = requests.get(url)

    if response.status_code != 200:
        return None, None, None

    soup = BeautifulSoup(response.text, "html.parser")

    price_element = soup.select_one(".current-price.jsx-1156941347")
    price = price_element.text if price_element else None

    bracketed_value = None
    percentage_change = None

    change_elements = soup.select(
        ".quote-box-root.jsx-1156941347 .change.jsx-1156941347"
    )

    if change_elements:
        change_text = " ".join([element.text for element in change_elements])
        start_index = change_text.find("(")
        end_index = change_text.find(")")

        if start_index != -1 and end_index != -1:
            bracketed_value = change_text[start_index + 1:end_index]
            bracketed_value = float(bracketed_value)

    if price:
        price = float(price.replace(",", ""))

    if price is not None and bracketed_value is not None:
        percentage_change = (bracketed_value / price) * 100

    return price, bracketed_value, percentage_change

# Define a route to fetch market and sector data
@app.route("/market-and-sectors", methods=["GET"])
def get_market_and_sectors_data():
    market_sectors_data = {}
    
    # Fetch data for each stock symbol
    for symbol, name in stock_data.items():
        price, bracketed_value, percentage_change = fetch_stock_data(symbol)
        market_sectors_data[name] = {
            "symbol": symbol,
            "price": price,
            "change_bracketed_value": bracketed_value,
            "percentage_change": percentage_change,
        }

    # Also fetch the Sensex share amount and add it to the response
    sensex_share_amount = fetch_sensex_share_amount()
    market_sectors_data['Sensex'] = {
        "share_amount": sensex_share_amount
    }

    return jsonify(market_sectors_data)

# Run the server
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
