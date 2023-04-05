import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: '',
    loadComponent: () =>
      import('./login-page/login-page.page').then((m) => m.LoginPagePage),
  },
  {
    path: 'booking-page',
    loadComponent: () =>
      import('./pages/booking-page/booking-page.page').then(
        (m) => m.BookingPagePage
      ),
  },
  {
    path: 'notification-page',
    loadComponent: () =>
      import('./pages/notification-page/notification-page.page').then(
        (m) => m.NotificationPagePage
      ),
  },  {
    path: 'signup-page',
    loadComponent: () => import('./pages/signup-page/signup-page.page').then( m => m.SignupPagePage)
  },

];
