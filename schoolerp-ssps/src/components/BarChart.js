import { Bar } from "react-chartjs-2";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export const BarChart = ({ chartData }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        // Cleanup previous chart instance when chartData changes
        if (chartRef.current) {
            chartRef.current.chartInstance.destroy();
        }

        // Render new chart instance
        const ctx = document.getElementById("bar-chart");
        if (ctx && chartData) {
            const newChartInstance = new Chart(ctx, {
                type: "bar",
                data: chartData,
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: "Fees Dues as per Class"
                        },
                        legend: {
                            display: false
                        }
                    }
                }
            });
            chartRef.current = newChartInstance;
        }

        // Cleanup on component unmount
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [chartData]);

    return (
        <div className="chart-container">
            
            <Bar className="bar-chart"
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Fees Dues as per Class"
                        },
                        legend: {
                            display: false
                        }
                    }
                }}
            />
        </div>
    );
};
