import { useState } from 'react';
import OrderBarChart from '../components/order-bar-chart/OrderBarChart';
import OrderPieChart from '../components/order-pie-chart/OrderPieChart';
import SalesBarChart from '../components/sales-bar-chart/SalesBarChart';
import SalesPieChart from '../components/sales-pie-chart/SalesPieChart';
import SummaryCards from '../components/summary-detail-cards/SummaryCards';

function MainDashboard() {
  const [showPieChart, setShowPieChart] = useState<boolean>(false);

  return (
    <div className='p-8 max-h-screen overflow-y-hidden flex flex-col items-center gap-4 dashboard'>
      <SummaryCards />

      <div className='flex justify-center my-4'>
        <button
          className={`px-4 py-2 text-sm font-medium rounded-l-lg focus:outline-none ${
            !showPieChart
              ? 'bg-slate-950 text-white'
              : 'bg-white text-slate-950 border'
          }`}
          onClick={() => setShowPieChart(false)}
        >
          Bar Chart
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium rounded-r-lg focus:outline-none ${
            showPieChart
              ? 'bg-slate-950 text-white'
              : 'bg-white text-slate-950 border'
          }`}
          onClick={() => setShowPieChart(true)}
        >
          Pie Chart
        </button>
      </div>

      <div
        className={`flex flex-col sm:flex-row items-center w-full gap-8 ${
          showPieChart ? 'justify-evenly' : 'justify-between'
        }`}
      >
        {showPieChart ? (
          <>
            <SalesPieChart />
            <OrderPieChart />
          </>
        ) : (
          <>
            <SalesBarChart />
            <OrderBarChart />
          </>
        )}
      </div>
    </div>
  );
}

export default MainDashboard;
