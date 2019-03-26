import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public user: UserProvider) {
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

  updateProfile() {
    this.user.updateUserModel(this.user.userData)
      .subscribe(
        (data) => {
          console.log(data, "YEY!!!!!!")
        }, 
        (err) => {
          console.log(err);
          // alert("Please try submitting again.")
        })


    // let loader = this.loader.create({
    // })
    // loader.present()
    // this._user.updateUser()
    //   .subscribe(_ => {
    //     loader.dismiss();
    //     this.editting = false;
    //   }, err => {
    //     console.error(err)
    //     loader.dismiss()
    //     let toast = this.toastCtrl.create({
    //       message: 'Unable to update at this time',
    //       duration: 2000,
    //       position: 'top'
    //     });
    //     toast.present()
    //   })
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


  
  // updatePassword() {
  //   this.editing = false;
  //   this.user.updateUserModel(this.user.userData.password)
  //     .subscribe(
  //       (data) => {
  //         console.log(data, "Password Updated")
  //       },
  //       (err) => {
  //         console.log(err);
  //         // alert("Please try submitting again.")
  //       })
  // }

  //todo connect backend for update user object
  

}
