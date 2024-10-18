import React, { Component } from 'react';
import Chart from "react-apexcharts";

export class ChartSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Price: {
                options: {
                    chart: {
                        id: 'area-datetime',
                        toolbar: {
                            show: true,
                            tools: {
                                home: '<button class="apexcharts-toolbar-button" onclick="window.location.reload();">Home</button>',
                            },
                        },
                    },
                    grid: {
                        show: true, // Show grid lines for better readability
                        borderColor: '#555',
                        strokeDashArray: 5,
                    },
                    title: {
                        text: "Market Price (USD)",
                        style: {
                            fontSize: '16px',
                            fontWeight: 'bold',
                            color: "#fcdf03",
                        },
                    },
                    stroke: {
                        curve: 'smooth',
                        width: 2,
                    },
                    xaxis: {
                        type: "datetime",
                        labels: {
                            style: {
                                colors: "#fcdf03",
                                fontSize: '12px',
                            },
                        },
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    yaxis: {
                        show: true,
                        labels: {
                            formatter: (value) => value.toFixed(2), // Format Y-axis labels to two decimal places
                            style: {
                                colors: "#fcdf03",
                                fontSize: '12px',
                            },
                        },
                    },
                    colors: ["#fcdf03"],
                    tooltip: {
                        y: {
                            formatter: (value) => `$${parseFloat(value).toFixed(2)}`, // Show two decimal places in tooltip
                        },
                        theme: "dark",
                    },
                },
                series: [
                    {
                        name: 'Market Price',
                        data: [] // Data will be populated from API
                    }
                ]
            },
        };
    }

    fetchData = async () => {
        try {
            let response = await fetch(`http://localhost:5001/api/finance/${this.props.symbol}`);
            const jsonChartData = await response.json();

            const prices = jsonChartData.chart.result[0].indicators.quote[0].close.map((price, index) => [
                jsonChartData.chart.result[0].timestamp[index] * 1000,
                price ? parseFloat(price).toFixed(2) : null // Format price to two decimal points if it's valid
            ]).filter(data => data[1] !== null); // Remove null values

            this.setState({
                Price: { 
                    options: this.state.Price.options, 
                    series: [{ name: 'Market Price', data: prices }] 
                }
            });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.symbol !== this.props.symbol) {
            this.fetchData();
        }
    }

    render() {
        return (
            <div style={styles.chartContainer}>
                <Chart
                    options={this.state.Price.options}
                    series={this.state.Price.series}
                    type="area"
                    height='600'
                    width='100%' />
            </div>
        );
    }
}

const styles = {
    chartContainer: {
        flex: '1 1 600px', // Allow flexibility and set a minimum width
        margin: '10px',
    },
};

export default ChartSection;
