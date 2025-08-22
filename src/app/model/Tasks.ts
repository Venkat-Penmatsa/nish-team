import { Component, OnInit } from '@angular/core';

export interface HotList {
  expiringContractsList: ExpiringContract[];
  dateOfBirthList: Birthday[];
  workAnniversaryList: Anniversary[];
  rpExpiryList: RPExpiry[];
  employeesOnBench: string[];
  employeesWithOutContracts: string[];
  freezeTimesheet: string[];
  generateRtt: string[];
}

export interface ExpiringContract {
  contractId: string;
  expiryDate: string;
  name: string;
  client: string;
  daysLeft: number;
}

export interface Birthday {
  empName: string;
  date: [number, number, number];
}

export interface Anniversary extends Birthday {}
export interface RPExpiry extends Birthday {}
