import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';



@IonicPage()
@Component({
  selector: 'page-profile-modal',
  templateUrl: 'profile-modal.html',
})
export class ProfileModalPage {

  constructor(
    public view: ViewController,
    public navParams: NavParams, 
    public user: UserProvider, ) {
  }

  accountInfoEdit: boolean = false;


  closeModal() {
    this.view.dismiss()
  } 

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileModalPage');
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
  }

  allowAccountInfoEdit() {
    if (this.accountInfoEdit == true) {
      this.updateProfile();
    }
    this.accountInfoEdit = !this.accountInfoEdit;
  }

}
