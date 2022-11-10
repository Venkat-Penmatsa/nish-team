import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-emp-offer-simulation',
  templateUrl: './emp-offer-simulation.component.html',
  styleUrls: ['./emp-offer-simulation.component.css']
})
export class EmpOfferSimulationComponent implements OnInit {

  constructor(private fb: UntypedFormBuilder) { }

  ngOnInit(): void {

    this.simulationForm.patchValue({
      insurance:100,
      car:800,
      fuelCard: 200,
      carInsurance:200,
      mobile: 400,
      laptop: 600,
      mealVoucher: 176,
      bonus:0,
      ecoCheques:250,
      adminCharges:1000
    });
  }

  calculateYearBilling(){

    const billingRate =  this.simulationForm.get('dailyRate')?.value;
    this.simulationForm.patchValue({
      yearBilling: billingRate*220
    });

    this.calculateSimulation();
  }

  calculateGross(){

    const grossPerMonth =  this.simulationForm.get('grossPerMonth')?.value;
    const tax = grossPerMonth*33/100;
    this.simulationForm.patchValue({
      grossTax: tax
    });

    this.calculateSimulation();
  }

  calculateSimulation(){

    if(this.simulationForm.get('grossPerMonth')?.value && this.simulationForm.get('dailyRate')?.value) {

      const grossPerMonth =  this.simulationForm.get('grossPerMonth')?.value;
      const grossTax =  this.simulationForm.get('grossTax')?.value;
      const grossPerYear = (grossPerMonth+grossTax)*13.92;

      const insurance =  this.simulationForm.get('insurance')?.value;
      const car =  this.simulationForm.get('car')?.value;
      const fuelCard =  this.simulationForm.get('fuelCard')?.value;
      const carInsurance =  this.simulationForm.get('carInsurance')?.value;
      const mealVoucher =  this.simulationForm.get('mealVoucher')?.value;

      const rest = (insurance+car+fuelCard+carInsurance+mealVoucher)*12;
  
      const laptop =  this.simulationForm.get('laptop')?.value;
      const mobile =  this.simulationForm.get('mobile')?.value;
      const bonus =  this.simulationForm.get('bonus')?.value;
      const ecoCheques =  this.simulationForm.get('ecoCheques')?.value;
      const adminCharges =  this.simulationForm.get('adminCharges')?.value;

      const ctc = (bonus+mobile+laptop+ecoCheques+adminCharges+grossPerYear+rest)*1;

      const yearBilling =  this.simulationForm.get('yearBilling')?.value;

      const margin = Math.round(yearBilling-ctc);

      this.simulationForm.patchValue({
        grossPerYear: grossPerYear,
        rest: rest,
        ctc: ctc,
        margin: margin
      });

    }
   
  }

  simulationForm = this.fb.group({
    dailyRate: ['', Validators.required],
    yearBilling: ['', Validators.required],
    grossPerMonth: ['', Validators.required],
    grossTax: [''],
    car: [''],
    insurance: ['', Validators.required],
    fuelCard: [''],
    carInsurance: [''],
    mobile: [''],
    ecoCheques:[],
    adminCharges:[],
    laptop: [''],
    mealVoucher: ['', Validators.required],
    bonus: [''],
    grossPerYear: ['', Validators.required],
    rest: ['', Validators.required],
    ctc: ['', ],
    margin: ['', ],
    
  });

}
