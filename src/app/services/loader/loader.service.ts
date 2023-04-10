import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loader: any;
  constructor(private loadingController: LoadingController) {}

  async show(message?: string) {
    this.loader = await this.loadingController.create({
      message: message ? message : 'Please wait...',
    });
    await this.loader.present();
  }

  async hide() {
    if (this.loader) {
      await this.loader.dismiss();
      this.loader = null;
    }
  }
}
