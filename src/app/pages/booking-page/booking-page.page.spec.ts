import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingPagePage } from './booking-page.page';

describe('BookingPagePage', () => {
  let component: BookingPagePage;
  let fixture: ComponentFixture<BookingPagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BookingPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
