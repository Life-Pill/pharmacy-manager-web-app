import React from 'react';
import { fakeBranchData } from '../../../../interfaces/PharmacyBranch';
import { Doughnut, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

type Props = {};

function OrderPieChart({}: Props) {
  const branchNames = fakeBranchData.map((branch) => branch.name);
  const orderData = fakeBranchData.map((branch) => branch.orders);

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
    <div>
      <h2>Orders Pie Chart</h2>
      <Doughnut data={data} />
    </div>
  );
}

export default OrderPieChart;
