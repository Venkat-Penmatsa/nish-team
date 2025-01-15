import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-emp-offer-simulation',
  templateUrl: './emp-offer-simulation.component.html',
  styleUrls: ['./emp-offer-simulation.component.css'],
})
export class EmpOfferSimulationComponent implements OnInit {
  constructor(private fb: UntypedFormBuilder) {}
  transportOption: any;
  user: User;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userDetails') || '{}') as User;

    this.simulationForm.patchValue({
      insurance: 100,
      car: 800,
      fuelCard: 200,
      carInsurance: 200,
      mobile: 400,
      laptop: 600,
      mealVoucher: 176,
      bonus: 0,
      mobility: 0,
      sim: 400,
      ecoCheques: 250,
      adminCharges: 1500,
      benefits: 1200,
    });
  }

  calculateYearBilling() {
    const billingRate = this.simulationForm.get('dailyRate')?.value;
    this.simulationForm.patchValue({
      yearBilling: billingRate * 215,
    });

    this.calculateSimulation();
  }

  calculateGross() {
    const grossPerMonth = this.simulationForm.get('grossPerMonth')?.value;
    const tax = (grossPerMonth * 33) / 100;
    this.simulationForm.patchValue({
      grossTax: tax,
    });

    this.calculateSimulation();
  }

  calculateSimulation() {
    if (
      this.simulationForm.get('grossPerMonth')?.value &&
      this.simulationForm.get('dailyRate')?.value
    ) {
      const grossPerMonth = this.simulationForm.get('grossPerMonth')?.value;
      const grossTax = this.simulationForm.get('grossTax')?.value;
      const grossPerYear = (grossPerMonth + grossTax) * 13.92;

      const insurance = this.simulationForm.get('insurance')?.value;
      const mealVoucher = this.simulationForm.get('mealVoucher')?.value;

      let transport = 0;

      if (this.transportOption != null && this.transportOption != '') {
        if (this.transportOption == 'Car') {
          const car = this.simulationForm.get('car')?.value;
          const fuelCard = this.simulationForm.get('fuelCard')?.value;
          const carInsurance = this.simulationForm.get('carInsurance')?.value;
          transport = (car + fuelCard + carInsurance) * 12;
        } else if (this.transportOption == 'Mobility') {
          transport = this.simulationForm.get('mobility')?.value;
        }
      }

      const rest = (insurance + mealVoucher) * 12;

      const laptop = this.simulationForm.get('laptop')?.value;
      const mobile = this.simulationForm.get('mobile')?.value;
      const bonus = this.simulationForm.get('bonus')?.value;
      const ecoCheques = this.simulationForm.get('ecoCheques')?.value;
      const adminCharges = this.simulationForm.get('adminCharges')?.value;
      const benefits = this.simulationForm.get('benefits')?.value;
      const sim = this.simulationForm.get('sim')?.value;

      const ctc =
        (bonus +
          mobile +
          laptop +
          ecoCheques +
          adminCharges +
          sim +
          benefits +
          grossPerYear +
          rest +
          transport) *
        1;

      const yearBilling = this.simulationForm.get('yearBilling')?.value;

      const margin = Math.round(yearBilling - ctc);

      let range = 0;
      if (margin <= 0) {
        range = 0;
      } else if (margin > 0 && margin <= 10000) {
        range = 1;
      } else if (margin > 10000 && margin <= 20000) {
        range = 2;
      } else if (margin > 20000) {
        range = 3;
      }

      this.simulationForm.patchValue({
        grossPerYear: grossPerYear,
        rest: rest,
        ctc: ctc,
        range: range,
        margin: margin,
      });
    }
  }

  simulationForm = this.fb.group({
    dailyRate: ['', Validators.required],
    yearBilling: ['', Validators.required],
    grossPerMonth: ['', Validators.required],
    grossTax: [''],
    transportOption: [''],
    car: [''],
    insurance: ['', Validators.required],
    fuelCard: [''],
    carInsurance: [''],
    mobility: [''],
    mobile: [''],
    sim: [''],
    ecoCheques: [],
    adminCharges: [],
    laptop: [''],
    mealVoucher: ['', Validators.required],
    bonus: [''],
    benefits: [''],
    grossPerYear: ['', Validators.required],
    rest: ['', Validators.required],
    ctc: [''],
    range: [''],
    margin: [''],
  });
}
