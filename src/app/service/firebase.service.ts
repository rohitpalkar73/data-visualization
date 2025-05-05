import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore';
import { addFirebaseData } from '../ngrx/data.action';
import { Router } from '@angular/router';

// Your Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAB6s5nxloM8jX6Hn_H20BaAyscZ5mnl64",
  authDomain: "charts-e32e0.firebaseapp.com",
  projectId: "charts-e32e0",
  storageBucket: "charts-e32e0.appspot.com",
  messagingSenderId: "371199598163",
  appId: "1:371199598163:web:45f04a6c7a16dd71f170a6",
  databaseURL: "https://charts-e32e0.firebaseio.com",
};



@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private app: any;
  private db: any;
  private data: any;

  constructor(private store: Store, private router: Router) {
    // this.addClient("userName", this.data);
  }

  initFirebase() {
    this.app = initializeApp(firebaseConfig);
    this.db = getFirestore(this.app);
  }

  // Example function to add a document
  async addClient(clientId: any, clientData: any) {
    if (!this.app && !this.db) this.initFirebase();
    try {
      await setDoc(doc(this.db, "users", clientId), clientData);
      console.log('Users data added successfully!');
    } catch (error) {
      console.error('Error adding user data: ', error);
    }
  }

  // Example function to get a document
  async getClientData(clientId: any) {

    if (this.data && this.data.cliendId === clientId) {
      this.router.navigate(["/visualize"]);
      return;
    }

    if (!this.app && !this.db) this.initFirebase();
    try {
      const docRef = doc(this.db, "users", clientId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.data = {
          "cliendId": clientId,
          "data": docSnap.data()
        }

        this.store.dispatch(addFirebaseData({ csvData: this.data['data'] }));
        this.router.navigate(["/visualize"]);

      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error retrieving user data: ', error);
    }
  }

}
