import { Injectable } from '@angular/core';
import {
  child,
  Database,
  get,
  onValue,
  orderByChild,
  ref,
  remove,
  startAt,
  endAt,
  query,
  push,
  update,
  serverTimestamp,
  equalTo,
} from '@angular/fire/database';
import { from, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private db: Database) { }

  getDataSnapshot(table:string): Observable<any> {
    const dbInstance = ref(this.db, `${table}/`);

    return from(
      get(dbInstance)
        .then((snapshot) => {
          if (snapshot.exists()) {
            return {
              status: 200,
              message: 'success',
              data: snapshot.val(),
            };
          } else {
            return {
              status: 400,
              message: 'No data available',
              data: undefined,
            };
          }
        })
        .catch((error) => {
          console.error(error);
          return {
            status: 400,
            message: 'Error',
            data: error,
          };
        })
    );
  }

  getSingleDataSnapshot(id: string): Observable<any> {
    const dbInstance = ref(this.db, `data/-${id}`);

    return from(
      get(dbInstance)
        .then((snapshot) => {
          if (snapshot.exists()) {
            return {
              status: 200,
              message: 'success',
              data: snapshot.val(),
            };
          } else {
            return {
              status: 400,
              message: 'No data available',
              data: undefined,
            };
          }
        })
        .catch((error) => {
          console.error(error);
          return {
            status: 400,
            message: 'Error',
            data: error,
          };
        })
    );
  }

  async updatePatientData(key: string, data: any): Promise<void> {
    const dbInstance = ref(this.db, `data/-${key}`);
    const modifiedData = { ...data, lastModified: new Date().toString() };
    try {
      const response = await update(dbInstance, modifiedData);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async removeData(id: string): Promise<any> {
    const dbInstance = ref(this.db, `data/-${id}`);

    try {
      const response = await remove(dbInstance);
      return response;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }

  getDataByDateRange(startDate: string, endDate: string): Observable<any> {
    const dbInstance = ref(this.db, 'data/');
    const sortedData = query(dbInstance, orderByChild('date'));
    const filteredData = query(sortedData, startAt(startDate), endAt(endDate));
    return from(
      get(filteredData)
        .then((snapshot) => {
          if (snapshot.exists()) {
            return {
              status: 200,
              message: 'success',
              data: snapshot.val(),
            };
          } else {
            return {
              status: 400,
              message: 'No data available',
              data: undefined,
            };
          }
        })
        .catch((error) => {
          console.error(error);
          return {
            status: 400,
            message: 'Error',
            data: error,
          };
        })
    );
  }

  getDataByName(name: string): Observable<any> {
    const dbInstance = ref(this.db, 'data/');
    const sortedData = query(dbInstance, orderByChild('name'));
    const filteredData = query(sortedData, equalTo(name));
    return from(
      get(filteredData)
        .then((snapshot) => {
          if (snapshot.exists()) {
            return {
              status: 200,
              message: 'success',
              data: snapshot.val(),
            };
          } else {
            return {
              status: 400,
              message: 'No data available',
              data: undefined,
            };
          }
        })
        .catch((error) => {
          console.error(error);
          return {
            status: 400,
            message: 'Error',
            data: error,
          };
        })
    );
  }

  getDataById(uid: string): Observable<any> {
    const dbInstance = ref(this.db, 'booking/');
    const sortedData = query(dbInstance, orderByChild('uid'));
    const filteredData = query(sortedData, equalTo(uid));
    return from(
      get(filteredData)
        .then((snapshot) => {
          if (snapshot.exists()) {
            return {
              status: 200,
              message: 'success',
              data: snapshot.val(),
            };
          } else {
            return {
              status: 400,
              message: 'No data available',
              data: undefined,
            };
          }
        })
        .catch((error) => {
          console.error(error);
          return {
            status: 400,
            message: 'Error',
            data: error,
          };
        })
    );
  }

  async addData(data: any, table:string): Promise<any> {
    const dbInstance = ref(this.db, `${table}/`);

    try {
      const response = await push(dbInstance, data);
      return {
        status:200,
        message:'Booking added successfully',
        reference:response
      };
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
}
