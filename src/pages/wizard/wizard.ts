import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the WizardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-wizard',
  templateUrl: 'wizard.html',
})
export class WizardPage {

  private todo : FormGroup;
  @ViewChild(Slides) slides: Slides;
  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, public navParams: NavParams) {
    this.todo = this.formBuilder.group({
      injured: ["injured", Validators.required],
     
      EnlistingDate: ['', Validators.required],
      branch: ['' ]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WizardPage');
    
  }
  logForm(){

     console.log(this.todo.value)
  }


  //when navigating to the new slide when user clicks submit 
  onSubmit() {  
      this.slides.slideTo(6, 500);

    }
    
next() {
  this.slides.slideTo(6, 500);
}

}
