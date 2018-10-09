import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { PasswordValidator } from '../../validators/password.validator';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  private validate: FormGroup
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formbuilder: FormBuilder) {

    this.validate = this.formbuilder.group({
      first: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      last: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      pass: this.formbuilder.group({
        password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
        passwordCheck: ['', Validators.required]
      }, {validator: PasswordValidator})
    })
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  regForm(){
    this.submitAttempt = true
    console.log(this.validate)
  }

}

