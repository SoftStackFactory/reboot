import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  private validate: FormGroup

  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder) {
    this.validate = this.fb.group({
      first: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      last: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      passwordCheck: ['', Validators.required]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  regForm(){
    console.log(this.validate)
  }

}
