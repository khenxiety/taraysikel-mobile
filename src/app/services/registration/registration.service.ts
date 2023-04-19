import { Injectable } from '@angular/core';
import { Auth,signInWithPhoneNumber,RecaptchaVerifier } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private auth:Auth) { }

  async registerWithPhoneNumber(phoneNumber:string):Promise<any>{
    const appVerifier = await this.getRecaptchaVerifier()
    try {
      const registration = await signInWithPhoneNumber(this.auth,phoneNumber,appVerifier)
      const verificationCode = prompt('Please enter the verification code sent to your phone');
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
    const verifier = new RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
      callback: (response:any) => {
        console.log(response);
      },
    },this.auth);
    await verifier.render();
    return verifier;
  }
 
}
