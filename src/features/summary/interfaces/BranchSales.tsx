interface DailySalesSummary {
  date: string;
  orders: number;
  sales: number;
}

export interface BranchSalesData {
  branchId: number;
  dailySalesSummary: DailySalesSummary[];
}
