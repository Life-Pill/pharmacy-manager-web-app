import SalesBarChart from '../components/sales-by-branch-bar-chart/SalesBarChart';
import OrderPieChart from '../components/order-by-branch-pie-chart/OrderPieChart';
import SummaryCards from '../components/summary-detail-cards/SummaryCards';

function MainDashboard() {
  return (
    <div className='p-8 max-h-screen overflow-y-hidden flex flex-col items-center gap-16 dashboard'>
      <SummaryCards />

      <div className='flex flex-col sm:flex-row justify-evenly items-center w-full gap-8'>
        <SalesBarChart />

        <OrderPieChart />
      </div>
    </div>
  );
}

export default MainDashboard;
