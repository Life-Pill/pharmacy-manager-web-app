import React from 'react';
import { Bar } from 'react-chartjs-2';
import { fakeBranchData } from '../../../../interfaces/PharmacyBranch';
import 'chart.js/auto';

type Props = {};

const SalesBarChart: React.FC<Props> = () => {
  const branchNames = fakeBranchData.map((branch) => branch.name);
  const salesData = fakeBranchData.map((branch) => branch.sales);

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
    <div>
      <h2>Sales Bar Chart</h2>
      <Bar data={data} />
    </div>
  );
};

export default SalesBarChart;
