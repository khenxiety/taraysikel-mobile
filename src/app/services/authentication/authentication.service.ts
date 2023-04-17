import { Injectable } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  Auth,
  updateProfile,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';

import {
  Database,
  get,
  orderByChild,
  ref,
  query,
  push,
  equalTo,
} from '@angular/fire/database';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private db: Database,
    private authService: Auth,
    private storage: Storage
  ) {}

  async userSignup(data: any): Promise<any> {
    try {
      const createUser = await createUserWithEmailAndPassword(
        this.authService,
        data.value.email,
        data.value.password
      );
      await updateProfile(createUser.user, {
        displayName: data.value.firstName,
      });
      const addData = await this.addData(data, createUser.user.uid);
      return Promise.resolve({
        status: 200,
        message: 'Registration Successfull',
      });
    } catch (error: any) {
      console.error(error.message);
      return Promise.reject(error);
    }
  }

  async addData(data: any, uid: string): Promise<any> {
    try {
      const reg = {
        ...data.value,
        type: 'user',
        userId: uid,
      };

      const dbInstance = ref(this.db, 'users/');
      const res = await push(dbInstance, reg);
      return res;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async userLogin(data: any): Promise<any> {
    try {
      const loginUser = await signInWithEmailAndPassword(
        this.authService,
        data.value.email,
        data.value.password
      );

      const verification = await this.roleVerification(data.value.email);

      if (verification && verification.type === 'user') {
        return { status: 200, message: 'Login Successfully', data: loginUser };
      } else {
        this.userLogout();
        throw { status: 'error', code: 'User does not exist' };
      }
    } catch (error: any) {
      console.error(error.code);
      return Promise.reject(error);
    }
  }

  async roleVerification(data: any): Promise<any> {
    const dbInstance = ref(this.db, 'users/');
    const sortedData = query(dbInstance, orderByChild('email'));
    const filteredData = query(sortedData, equalTo(data));

    try {
      const role = await get(filteredData);
      if (role.exists()) {
        const userData = role.val();
        return Promise.resolve(userData ? Object.values(userData)[0] : null);
      } else {
        return Promise.resolve(undefined);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async userLogout(): Promise<any> {
    try {
      const signout = await this.authService.signOut();
      return signout;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
