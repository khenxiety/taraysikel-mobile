import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class IonicStorageService {
  constructor(private storage: Storage) {}

  async setItem(items: any, key: string) {
    try {
      await this.storage.create();
      // const item =
      //   typeof items === 'object' ? JSON.stringify(await items) : await items;
      // console.log(item);
      console.log(items);
      const set = await this.storage.set(key, items);

      return set;
    } catch (error) {
      throw error;
    }
  }

  async getItem(key: string) {
    try {
      await this.storage.create();
      const item = await this.storage.get(key);
      return item;
    } catch (error) {
      throw error;
    }
  }

  async clearStorage() {
    try {
      await this.storage.create();
      const item = await this.storage.clear();
      return item;
    } catch (error) {
      throw error;
    }
  }
}
