import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loading: any;

  constructor(
      private loadingCtrl: LoadingController
  ) { }

  async createLoading() {
      (await this.loading).present();
  }

  async goLoading() {
      this.loading = this.loadingCtrl.create();
      this.createLoading();
  }

  async endLoading() {
      setTimeout(async () => {
       (await this.loading).dismiss();
      }, 100);
  }
}
