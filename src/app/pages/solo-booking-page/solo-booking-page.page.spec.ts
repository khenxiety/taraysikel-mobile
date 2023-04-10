import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SoloBookingPagePage } from './solo-booking-page.page';

describe('SoloBookingPagePage', () => {
  let component: SoloBookingPagePage;
  let fixture: ComponentFixture<SoloBookingPagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SoloBookingPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
