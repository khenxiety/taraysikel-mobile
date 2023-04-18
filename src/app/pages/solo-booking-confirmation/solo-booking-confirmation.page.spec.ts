import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SoloBookingConfirmationPage } from './solo-booking-confirmation.page';

describe('SoloBookingConfirmationPage', () => {
  let component: SoloBookingConfirmationPage;
  let fixture: ComponentFixture<SoloBookingConfirmationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SoloBookingConfirmationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
