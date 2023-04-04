import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { register } from 'swiper/element/bundle';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import {
  provideAnalytics,
  getAnalytics,
  ScreenTrackingService,
  UserTrackingService,
  
} from '@angular/fire/analytics';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { TextEllipsisDirective } from './directives/text-ellipsis.directive';
register();

@NgModule({
  declarations: [AppComponent, TextEllipsisDirective],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    CommonModule,
    RouterModule.forRoot(routes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ScreenTrackingService, UserTrackingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
