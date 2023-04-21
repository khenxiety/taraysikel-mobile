import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.page.html',
  styleUrls: ['./booking-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class BookingListPage implements OnInit {
  @ViewChild(IonModal)
  modal!: IonModal;

  public bookingData: any;

  public name: string = '';
  message =
    'This modal example uses triggers to automatically open a modal when the button is clicked.';
  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getBookingData();
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  async getBookingData() {
    try {
      this.firebaseService.getDataSnapshot('booking').subscribe((res) => {
        const newArr = Object.keys(res.data).map((key) => res.data[key]);
        this.bookingData = newArr.sort((a, b) => b.date - a.date);
        this.bookingData.sort((a: any, b: any) => {
          if (a.date < b.date) return 1;
          if (a.date > b.date) return -1;
          return 0;
        });
        console.log(this.bookingData);
      });
    } catch (error) {}
  }

  viewDetails(data: any): void {
    const detailsObj = {
      pickUp: data.pickup,
      pickUpCoordsLon: data.pickUpCoords.lon,
      pickUpCoordsLat: data.pickUpCoords.lat,
      dropOff: `${data.dropOff.split(',')[0]}, ${data.dropOff.split(',')[1]}`,
      type: data.type,
      status: data.status,
      driver: data.driver,

      booker: 'random id',
      useType: 'details',
    };
    this.router.navigate(['/solo-booking-confirmation'], {
      queryParams: detailsObj,
    });
  }
}
