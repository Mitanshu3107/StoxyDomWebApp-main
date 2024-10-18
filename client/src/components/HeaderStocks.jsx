import React, { useState } from 'react';

const stockOptions = [
  { value: "AAPL", label: "Apple Inc." },
  { value: "GOOGL", label: "Alphabet Inc." },
  { value: "MSFT", label: "Microsoft Corp." },
  { value: "AMZN", label: "Amazon.com Inc." },
  { value: "TSLA", label: "Tesla Inc." },
  { value: "FB", label: "Meta Platforms, Inc." },
  { value: "NFLX", label: "Netflix, Inc." },
  { value: "NVDA", label: "NVIDIA Corporation" },
  { value: "BRK.A", label: "Berkshire Hathaway Inc." },
  { value: "BRK.B", label: "Berkshire Hathaway Inc." },
  { value: "DIS", label: "The Walt Disney Company" },
  { value: "V", label: "Visa Inc." },
  { value: "JNJ", label: "Johnson & Johnson" },
  { value: "PG", label: "Procter & Gamble Co." },
  { value: "HD", label: "The Home Depot, Inc." },
  { value: "UNH", label: "UnitedHealth Group Incorporated" },
  { value: "PYPL", label: "PayPal Holdings, Inc." },
  { value: "INTC", label: "Intel Corporation" },
  { value: "CSCO", label: "Cisco Systems, Inc." },
  { value: "ADBE", label: "Adobe Inc." },
  { value: "PEP", label: "PepsiCo, Inc." },
  { value: "KO", label: "Coca-Cola Company" },
  { value: "T", label: "AT&T Inc." },
  { value: "VZ", label: "Verizon Communications Inc." },
  { value: "XOM", label: "Exxon Mobil Corporation" },
  { value: "CVX", label: "Chevron Corporation" },
  { value: "NKE", label: "NIKE, Inc." },
  { value: "MRK", label: "Merck & Co., Inc." },
  { value: "TMO", label: "Thermo Fisher Scientific Inc." },
  { value: "IBM", label: "International Business Machines Corporation" },
  { value: "QCOM", label: "Qualcomm Incorporated" },
  { value: "TXN", label: "Texas Instruments Incorporated" },
  { value: "ORCL", label: "Oracle Corporation" },
  { value: "LMT", label: "Lockheed Martin Corporation" },
  { value: "MDT", label: "Medtronic plc" },
  { value: "BMY", label: "Bristol-Myers Squibb Company" },
  { value: "GILD", label: "Gilead Sciences, Inc." },
  { value: "LRCX", label: "Lam Research Corporation" },
  { value: "SBUX", label: "Starbucks Corporation" },
  { value: "AMGN", label: "Amgen Inc." },
  { value: "HON", label: "Honeywell International Inc." },
  { value: "BA", label: "The Boeing Company" },
  { value: "CAT", label: "Caterpillar Inc." },
  { value: "DE", label: "Deere & Company" },
  { value: "TGT", label: "Target Corporation" },
  { value: "NOW", label: "ServiceNow, Inc." },
  { value: "ATVI", label: "Activision Blizzard, Inc." },
  { value: "ZM", label: "Zoom Video Communications, Inc." },
  { value: "DOCU", label: "DocuSign, Inc." },
  { value: "PFE", label: "Pfizer Inc." },
  { value: "NVS", label: "Novartis AG" },
  { value: "MDLZ", label: "Mondelez International, Inc." },
  { value: "SYY", label: "Sysco Corporation" },
  { value: "APD", label: "Air Products and Chemicals, Inc." },
  { value: "ETR", label: "Entergy Corporation" },
  { value: "KMB", label: "Kimberly-Clark Corporation" },
  { value: "NEM", label: "Newmont Corporation" },
  { value: "MMC", label: "Marsh & McLennan Companies, Inc." },
  { value: "ADI", label: "Analog Devices, Inc." },
  { value: "CARR", label: "Carrier Global Corporation" },
  { value: "SRE", label: "Sempra Energy" },
  { value: "COF", label: "Capital One Financial Corporation" },
  { value: "USB", label: "U.S. Bancorp" },
];


const HeaderStocks = ({ handleSubmit }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(stockOptions);
    const [selectedStock, setSelectedStock] = useState(''); // Store selected stock

    const handleInputChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        setFilteredOptions(
            stockOptions.filter(option =>
                option.label.toLowerCase().includes(term.toLowerCase())
            )
        );
    };

    const handleOptionClick = (option) => {
        setSearchTerm(option.label);
        setSelectedStock(option.value); // Set the selected stock value
        setFilteredOptions(stockOptions); // Reset options after selection
    };

    const handleSearch = () => {
        // Only call handleSubmit when Search button is clicked
        if (selectedStock) {
            handleSubmit(selectedStock); // Use the selected stock value
            setSearchTerm(''); // Clear the search term after search
            setSelectedStock(''); // Clear the selected stock after search
        } else {
            const foundOption = stockOptions.find(option => option.label.toLowerCase() === searchTerm.toLowerCase());
            if (foundOption) {
                handleSubmit(foundOption.value); // Submit the found stock
                setSelectedStock(foundOption.value); // Update selected stock
            }
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch(); // Trigger search on Enter key press
        }
    };

    return (
        <header style={styles.header}>
            <div style={styles.searchContainer}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Search for a stock..."
                    style={styles.searchInput}
                />
                <button onClick={handleSearch} style={styles.searchButton}>Search</button>
                {searchTerm && filteredOptions.length > 0 && (
                    <ul style={styles.suggestionList}>
                        {filteredOptions.map((option) => (
                            <li
                                key={option.value}
                                onClick={() => handleOptionClick(option)}
                                style={styles.suggestionItem}
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </header>
    );
};

const styles = {
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#151e28',
        padding: '20px',
        borderBottom: '2px solid #fcdf03',
        color: '#fcdf03',
        position: 'relative',
    },
    title: {
        fontSize: '2.5rem',
        margin: '0 0 10px',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
    },
    searchContainer: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        width: '300px',
    },
    searchInput: {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #fcdf03',
        backgroundColor: '#3c3f43',
        color: '#fcdf03',
        fontSize: '1rem',
        flex: '1',
        outline: 'none',
        marginRight: '5px',
    },
    searchButton: {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #fcdf03',
        backgroundColor: '#fcdf03',
        color: '#282c34',
        fontSize: '1rem',
        cursor: 'pointer',
    },
    suggestionList: {
        listStyleType: 'none',
        padding: '0',
        margin: '0',
        position: 'absolute',
        top: '100%',
        left: '0',
        backgroundColor: '#3c3f43',
        width: '100%',
        zIndex: '10',
        borderRadius: '5px',
        maxHeight: '150px',
        overflowY: 'auto',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    suggestionItem: {
        padding: '10px',
        cursor: 'pointer',
        color: '#fcdf03',
        transition: 'background-color 0.2s',
    },
};

export default HeaderStocks;
