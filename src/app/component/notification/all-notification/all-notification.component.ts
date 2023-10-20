import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-notification',
  templateUrl: './all-notification.component.html',
  styleUrls: ['./all-notification.component.css'],
})
export class AllNotificationComponent implements OnInit {
  constructor() {}

  notificatio = [
    {
      notificationId: 'N4552',
      title: 'TEST',
      description: 'TEST',
      comments: 'CTEST',
      createdBy: 'Venkata Raju',
      status: 'ACTIVE',
      validFrom: null,
      validTo: null,
    },
  ];
  ngOnInit(): void {}
}
