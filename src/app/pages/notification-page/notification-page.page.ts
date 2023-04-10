import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-notification-page',
  templateUrl: './notification-page.page.html',
  styleUrls: ['./notification-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class NotificationPagePage implements OnInit {
  public notifications: any[] = [];
  public notificationsDummy: any[] = [
    'Content1',
    'Content2',
    'Content3',
    'Content4',
    'Content5',
    'Content6',
  ];

  public isLoading: boolean = false;

  constructor() {}

  ngOnInit() {
    this.isLoading = true;
    for (let i = 0; i <= 8; i++) {
      this.notifications.push({
        id: i,
        notification: `Notification ${i}`,
        user: `System`,
      });
    }

    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }
}
