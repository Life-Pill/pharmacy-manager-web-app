export interface Branch {
  branchId: number;
  branchName: string;
  branchAddress: string;
  branchContact: string;
  branchFax?: string; // Optional property with type string
  branchEmail: string;
  branchDescription: string;
  branchImage: string[];
  branchStatus: boolean;
  branchLocation: string;
  branchCreatedOn: string;
  branchCreatedBy: string;
}
