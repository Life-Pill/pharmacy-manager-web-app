import React, { useEffect, useState } from 'react';
import { BranchSalesData } from '../interfaces/BranchSales';
import { Line } from 'react-chartjs-2';

type Props = {
  branchSalesOrders: BranchSalesData[];
};

function OrdersChart({ branchSalesOrders }: Props) {
  // Define state to hold chart data
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    // When branchSalesOrders state updates, format data for chart
    if (branchSalesOrders.length > 0) {
      // Find the longest array of dates
      const longestDailySalesSummary = branchSalesOrders.reduce(
        (prev, current) =>
          prev.dailySalesSummary.length > current.dailySalesSummary.length
            ? prev
            : current
      );

      // Use the dates from the longest array of daily sales summaries
      const labels = longestDailySalesSummary.dailySalesSummary.map(
        (summary) => summary.date
      );

      const datasets = branchSalesOrders.map((branch) => ({
        label: `Branch ${branch.branchId}`,
        data: branch.dailySalesSummary.map((summary) => summary.orders),
        fill: false,
        borderColor: getRandomColor(),
        tension: 0.1,
      }));

      setChartData({ labels, datasets });
    }
  }, [branchSalesOrders]);

  // Function to generate random color
  const getRandomColor = () => {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)})`;
  };

  // Options for chart customization
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className='flex h-auto w-5/6 flex-col justify-center items-center'>
      <h2 className='text-xl font-bold'>Orders Graph</h2>

      <Line data={chartData} options={options} />
    </div>
  );
}

export default OrdersChart;
