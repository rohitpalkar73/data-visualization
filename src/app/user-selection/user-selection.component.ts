import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../service/firebase.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-selection',
  templateUrl: './user-selection.component.html',
  styleUrls: ['./user-selection.component.css']
})
export class UserSelectionComponent implements OnInit {
  form: any;

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      "user": new FormControl("", { validators: [Validators.required] }),
      // "id": new FormControl("", { validators: [Validators.required] }),
    });
  }

  getFirebaseData() {
    const creds = { ...this.form.value };
    this.firebaseService.getClientData(creds.user)

  }
}
