import { Component, OnInit } from '@angular/core';
import { NewcontractService } from 'src/app/services/contracts/newcontract.service';

@Component({
  selector: 'app-contract-days-report',
  templateUrl: './contract-days-report.component.html',
  styleUrls: ['./contract-days-report.component.css'],
})
export class ContractDaysReportComponent implements OnInit {
  public contractData!: ContractData[];
  constructor(private contractService: NewcontractService) {}
  totalCtc;
  totalCompanyRevenue;
  reveneYetToGenerate;

  ngOnInit(): void {
    this.generateReport();
  }

  generateReport() {
    this.contractService.getContractReport().subscribe((res: any) => {
      this.contractData = res.contractDataList;
    });
  }

  removeItem(itemId: any) {}
}

interface ContractData {
  empName?: string;
  contractId?: string;
  clientName?: string;
  contractDays?: number;
  daysWorked?: number;
  availableDays?: number;
}
