export interface PharmacyBranch {
  name: string;
  sales: number;
  orders: number;
  manager: string;
  branchId: number;
  branchAddress: string;
  branchContact?: string;
  branchFax?: string;
  branchEmail?: string;
  branchDescription?: string;
  branchImage?: ArrayBuffer;
  branchStatus?: boolean;
  branchLocation?: string;
  branchCreatedOn?: string;
  branchCreatedBy?: string;
}

export const fakeBranchData: PharmacyBranch[] = [
  {
    name: 'Branch 1',
    sales: 100000,
    orders: 1000,
    manager: 'Manager 1',
    branchId: 1,
    branchAddress: 'Address 1',
    branchStatus: true,
  },
  {
    name: 'Branch 2',
    sales: 200000,
    orders: 2000,
    manager: 'Manager 2',
    branchId: 2,
    branchAddress: 'Address 2',
    branchStatus: true,
  },
  {
    name: 'Branch 3',
    sales: 300000,
    orders: 3000,
    manager: 'Manager 3',
    branchId: 3,
    branchAddress: 'Address 3',
    branchStatus: true,
  },
  {
    name: 'Branch 4',
    sales: 400000,
    orders: 4000,
    manager: 'Manager 4',
    branchId: 4,
    branchAddress: 'Address 4',
    branchStatus: true,
  },
  {
    name: 'Branch 5',
    sales: 500000,
    orders: 5000,
    manager: 'Manager 5',
    branchId: 5,
    branchAddress: 'Address 5',
  },
  {
    name: 'Branch 6',
    sales: 600000,
    orders: 6000,
    manager: 'Manager 6',
    branchId: 6,
    branchAddress: 'Address 6',
  },
  {
    name: 'Branch 7',
    sales: 700000,
    orders: 7000,
    manager: 'Manager 7',
    branchId: 7,
    branchAddress: 'Address 7',
  },
  {
    name: 'Branch 8',
    sales: 800000,
    orders: 8000,
    manager: 'Manager 8',
    branchId: 8,
    branchAddress: 'Address 8',
  },
  {
    name: 'Branch 9',
    sales: 900000,
    orders: 9000,
    manager: 'Manager 9',
    branchId: 9,
    branchAddress: 'Address 9',
  },
  {
    name: 'Branch 10',
    sales: 1000000,
    orders: 10000,
    manager: 'Manager 10',
    branchId: 10,
    branchAddress: 'Address 10',
  },
];
