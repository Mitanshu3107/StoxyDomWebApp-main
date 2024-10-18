import React from 'react';

const ForecastSection = ({ symbol, forecastData }) => {
    return (
        <div style={styles.forecastContainer}>
            <h3 style={styles.title}>7-Day Price Forecast for {symbol}</h3>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Predicted Price (USD)</th>
                    </tr>
                </thead>
                <tbody>
                    {forecastData.map((data, index) => (
                        <tr key={index}>
                            <td>{data.date}</td>
                            <td>${data.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    forecastContainer: {
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#333',
        borderRadius: '8px',
        color: '#fcdf03',
    },
    title: {
        marginBottom: '10px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    th: {
        border: '1px solid #555',
        padding: '8px',
    },
    td: {
        border: '1px solid #555',
        padding: '8px',
    }
};

export default ForecastSection;
