interface BranchDTO {
  branchId: number;
  branchName: string;
  branchAddress: string;
  branchContact: string;
  branchFax: string;
  branchEmail: string;
  branchDescription: string;
  branchImage: string | null;
  branchStatus: boolean;
  branchLocation: string;
  branchCreatedOn: string;
  branchCreatedBy: string;
}

export interface IBranchAndSales {
  sales: number;
  orders: number;
  manager: string;
  branchDTO: BranchDTO;
}
