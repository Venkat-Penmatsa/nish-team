export interface Contract {

    employeeId: number;
    contractId: string;
    contractStatus: string;
    nishContractId: number;
    clientName: string;
    contractCompanyName: string;
    subContractCompany1: string;
    subContractCompany2: string;
    subContractCompany3: string;
    billingRate: number;
    contractStartDate: Date;
    contractEndDate: Date;
    comments: string;

}