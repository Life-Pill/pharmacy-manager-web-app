import React, { useEffect } from 'react';
import useBranchService from '../../services/BranchService';
import { Bar } from 'react-chartjs-2';

type Props = {};

function OrderBarChart({}: Props) {
  const { fetchAllBranchSales, allBranchSales, loadingAllBranchSales } =
    useBranchService();

  useEffect(() => {
    fetchAllBranchSales();
  }, []);

  const branchNames = allBranchSales?.map(
    (branch) => branch.branchDTO.branchName
  );
  const orderData = allBranchSales?.map((branch) => branch.orders);

  const data = {
    labels: branchNames,
    datasets: [
      {
        label: 'Orders',
        data: orderData,
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
    <div className='bg-white rounded-lg shadow-md p-6 order-pie-chart'>
      <h2 className='text-2xl font-semibold mb-4'>Orders Bar Chart</h2>
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

export default OrderBarChart;
