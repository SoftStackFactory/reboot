import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { PasswordValidator } from '../../validators/password.validator';
import { UserProvider } from '../../providers/user/user';
import { WizardPage } from '../wizard/wizard'
import { LoginPage } from '../login/login';
// import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  registerUser: any = {}

  private validate: FormGroup
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private formBuilder: FormBuilder, 
              public _userService: UserProvider, 
             // private storage: Storage,
              private toastCtrl: ToastController) {
    
    this.validate = this.formBuilder.group({
      first: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      last: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      pass: this.formBuilder.group({
        password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9!@#$%&*?]*'), Validators.required])],
        passwordCheck: ['', Validators.required]
      }, {validator: PasswordValidator})
    })
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  submitReg() {
    this.registerUser = {
      firstName: this.validate.value.first,
      lastName: this.validate.value.last,
      email: this.validate.value.email,
      password: this.validate.value.pass.password
    }
    this.submitAttempt = true
    this._userService.userName = this.registerUser.firstName;
    // this._userService.sendReg(this.registerUser)
    //   .subscribe( (data: any) => {
    //     this.storage.remove('userData')
    //     this.storage.set('userData', data)
   // console.log('data from submitReg()', data)
    //   },
    //   err => {
    // console.error('err from register:', err)
    //   },
    //   () => {
     this.goWizard()
    //   }
    //   ) 
  }

  goLogin() {
    this.navCtrl.setRoot(LoginPage)
  }

  goWizard() {
    let toast = this.toastCtrl.create({
      message: 'Thank you for registering. Welcome to InTransition!',
      duration: 2500,
      position: 'middle',
      cssClass: 'toasts', // You can find the css class in app.scss
    });
  
    toast.present();
    this.navCtrl.setRoot(WizardPage, {registered: this.registerUser});
  }

}

