import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    public user: UserProvider, 
    public modal: ModalController,
  public alertCtrl: AlertController) {
  }

  accountInfoEdit: boolean = false;
  userInfo: any;
  personalInfoEdit: boolean = false;
  militaryInfoEdit: boolean = false; 

  selectOptions(title: string, message: string) {
    let obj: object = {
      title: title,
      message: message,
      cssClass: 'branchRadio',
    }
    return obj;
  }

  branchOptions = this.selectOptions("Military Branch", "Select a branch");
  vetOrActiveOptions = this.selectOptions("Military Status", "Select one");
  disabilityOptions = this.selectOptions("Disability Status", "Select one");
  unemployedOptions = this.selectOptions("Employment Status", "Select one");
  maritalOptions = this.selectOptions("Marital Status", "Select one");
  rankOptions = this.selectOptions("Military Rank", "Select one");


  ionViewWillEnter() {
    this.getUserInfo()
  }


  onLogout() {
    // this.user.logoutUser(window.sessionStorage.getItem('token'))
    //   .subscribe( response => {
    //     console.log('onsubscibe-logout')
    //     window.sessionStorage.clear()
    //   })
  }

  openModal() {
    const myModal = this.modal.create ('ProfileModalPage'); 
    myModal.present();
  }

  getUserInfo() {
    this.user.getUser()
    .subscribe(response => {
      console.log('received user data')
      console.log(response)
      this.user.userData = response;
      console.log("User data");
      console.log(this.user.userData);
    })
  }

  allowAccountInfoEdit() {
    if (this.accountInfoEdit == true) {
      this.updateProfile();
    }
    this.accountInfoEdit = !this.accountInfoEdit;
  }

  allowPersonalInfoEdit() {
    if (this.personalInfoEdit == true) {
      this.updateProfile();
    }
    this.personalInfoEdit = !this.personalInfoEdit;
  }

  allowMilitaryInfoEdit() {
    if (this.militaryInfoEdit == true) {
      this.updateProfile();
    }
    this.militaryInfoEdit = !this.militaryInfoEdit;
  }

  updateProfile() {
    this.editing = false;
    console.log(this.user.userData)

    this.user.updateUserModel(this.user.userData)
      .subscribe(response => {
        console.log(response)
      })
  }

  resetPasswordPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Reset Password',
      inputs: [
        {
          name: 'new',
          placeholder: 'New Password'
        },
        {
          name: 'confirm',
          placeholder: 'Confirm New Password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Ok',
          handler: data => {
            if(data.new == data.confirm) {
              this.resetPassword(data.new)
            } else {
              this.passwordMissmatch()
            }
          }
        }
      ]
    });
    prompt.present();
  }

  passwordMissmatch() {
    const prompt = this.alertCtrl.create({
      title: 'Reset Password',
      message: 'Passwords do not match.',
      buttons: [
        {
          text: 'Ok',
          handler: data => {
            this.resetPasswordPrompt()
          }
        }
      ]
    });
    prompt.present();
  }

  passwordError() {
    const prompt = this.alertCtrl.create({
      title: 'Reset Password',
      message: 'There was an error resetting your password.',
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });
    prompt.present();
  }

  passwordSuccess() {
    const prompt = this.alertCtrl.create({
      title: 'Reset Password',
      message: 'Passwords Sucessfully Changed.',
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });
    prompt.present();
  }

  resetPassword(newPassword) {
    this.user.passwordReset(newPassword)
      .subscribe(response => {
        if(response.status == 204) {
          this.passwordSuccess()
        }
      },
      error => {
        this.passwordError()
      })
  }

}
