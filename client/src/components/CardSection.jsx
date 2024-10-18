import React from 'react';

export class CardSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exchangeRate: 0,
        };
    }

    // Method to fetch exchange rate
    fetchExchangeRate = async () => {
        try {
            const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
            const data = await response.json();
            this.setState({ exchangeRate: data.rates.INR });
        } catch (error) {
            console.error("Error fetching exchange rate:", error);
        }
    };

    componentDidMount() {
        this.fetchExchangeRate(); // Fetch exchange rate on mount
    }

    render() {
        const { exchangeRate } = this.state;
        const currentPriceINR = (this.props.currentPrice * exchangeRate).toFixed(2);
        const previousCloseINR = (this.props.previousClose * exchangeRate).toFixed(2);
        const volumeINR = this.props.volume ? this.props.volume.toLocaleString() : "N/A";

        return (
            <div style={styles.cardContainer}>
                <div className="fs-1 fw-bold m-3 text-Capitalize text-white"
                    style={styles.stockName}>
                    {this.props.stockName}
                </div>
                <section style={styles.cardRow}>
                    <div style={styles.card}>
                        <div style={styles.cardBody}>
                            <h6 style={styles.cardTitle}>Timezone</h6>
                            <p style={styles.cardText}>
                                {this.props.exchangeTimezoneName}
                            </p>
                        </div>
                    </div>
                    <div style={styles.card}>
                        <div style={styles.cardBody}>
                            <h6 style={styles.cardTitle}>Current Price (INR)</h6>
                            <p style={styles.cardText}>
                                ₹{currentPriceINR}
                            </p>
                        </div>
                    </div>
                    <div style={styles.card}>
                        <div style={styles.cardBody}>
                            <h6 style={styles.cardTitle}>Previous Close (INR)</h6>
                            <p style={styles.cardText}>
                                ₹{previousCloseINR}
                            </p>
                        </div>
                    </div>
                    <div style={styles.card}>
                        <div style={styles.cardBody}>
                            <h6 style={styles.cardTitle}>Volume</h6>
                            <p style={styles.cardText}>
                                {volumeINR}
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

const styles = {
    cardContainer: {
        flex: '1 1 300px',
        margin: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    stockName: {
        fontSize: '2rem', // Larger font for stock name
        marginBottom : '20px',
        marginTop : '25px',
        fontWeight : 'bold'
    },
    cardRow: {
        display: 'flex',
        flexDirection: 'column', // Ensure cards stack vertically
        width: '70%',
    },
    card: {
        width: '100%',
        backgroundColor: "rgb(43, 43, 43)",
        marginTop: '13px', // Add space between cards
        borderRadius: '8px', // Rounded corners
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Subtle shadow effect
        transition: 'transform 0.2s', // Smooth transform transition
    },
    cardBody: {
        padding: '20px',
        textAlign: 'center', // Center text within the card
    },
    cardTitle: {
        fontSize: '1.25rem', // Larger title
        marginBottom: '10px', // Space below the title
        color: 'white',
        fontWeight: 'bold', // Make the font bold

    },
    cardText: {
        color: "#fcdf03",
        fontSize: '1.125rem', // Slightly larger text
        margin: 0, // Reset margin
        fontWeight: 'bold', // Make the font bold
    },
    
};

// Add hover effect using a custom style method
const cardHoverStyle = {
    ...styles.card,
    transform: 'scale(1.05)', // Scale up on hover
};

// To achieve hover effect, you may need to handle mouse events manually.
export default CardSection;
