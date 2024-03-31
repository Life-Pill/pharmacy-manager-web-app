export interface PharmacyBranch {
  name: string;
  sales: number;
  orders: number;
  manager: string;
}

export const fakeBranchData: PharmacyBranch[] = [
  { name: 'Branch A', sales: 5000, orders: 100, manager: 'John Doe' },
  { name: 'Branch B', sales: 7000, orders: 120, manager: 'Jane Smith' },
  { name: 'Branch C', sales: 6000, orders: 110, manager: 'Alex Johnson' },
  { name: 'Branch D', sales: 8000, orders: 130, manager: 'Emily Brown' },
];
