import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import {
  Database,
  equalTo,
  orderByChild,
  push,
  query,
  ref,
  get,
} from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private auth: Auth, private db: Database) {}

  async registerWithPhoneNumber(phoneNumber: string): Promise<any> {
    const appVerifier = await this.getRecaptchaVerifier();
    try {
      const registration = await signInWithPhoneNumber(
        this.auth,
        phoneNumber,
        appVerifier
      );
      const verificationCode = prompt(
        'Please enter the verification code sent to your phone'
      );
      if (verificationCode) {
        const userCredential = await registration.confirm(verificationCode);
        return userCredential.user;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  private async getRecaptchaVerifier() {
    const siteKey = 'your-site-key';
    const verifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
        callback: (response: any) => {
          console.log(response);
        },
      },
      this.auth
    );
    await verifier.render();
    return verifier;
  }

  async userSignup(data: any): Promise<any> {
    try {
      const createUser = await createUserWithEmailAndPassword(
        this.auth,
        data.value.email,
        data.value.password
      );
      await updateProfile(createUser.user, {
        displayName: data.value.fullName,
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
        role: 'user',
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
        this.auth,
        data.value.email,
        data.value.password
      );

      // const verification = await this.roleVerification(data.value.email);

      if (loginUser) {
        return { status: 200, message: 'Login Successfully', data: loginUser };
      } else {
        this.userLogout();
        throw { status: 'error', code: 'User does not exist' };
      }
    } catch (error: any) {
      console.error(error);
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
      const signout = await this.auth.signOut();
      return signout;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
