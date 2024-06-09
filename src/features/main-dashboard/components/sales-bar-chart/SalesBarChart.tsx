import React, { useEffect } from 'react';
import useBranchService from '../../services/BranchService';
import { Bar } from 'react-chartjs-2';

type Props = {};

function SalesBarChart({}: Props) {
  const { allBranchSales, loadingAllBranchSales, fetchAllBranchSales } =
    useBranchService();

  useEffect(() => {
    fetchAllBranchSales();
  }, []);

  const branchNames = allBranchSales?.map(
    (branch) => branch.branchDTO.branchName
  );
  const salesData = allBranchSales?.map((branch) => branch.sales);

  const data = {
    labels: branchNames,
    datasets: [
      {
        label: 'Sales',
        data: salesData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
      },
    ],
  };

  return (
    <div className='bg-white rounded-lg shadow-md p-6 sales-bar-chart'>
      <h2 className='text-2xl font-semibold mb-2'>Sales Bar Chart</h2>
      <div className='w-full h-auto'>
        {loadingAllBranchSales ? (
          <p>loading...</p>
        ) : (
          <Bar data={data} width={500} height={250} />
        )}
      </div>
    </div>
  );
}

export default SalesBarChart;
