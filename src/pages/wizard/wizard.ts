import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, AlertController} from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

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

  constructor( public alertCtrl: AlertController, 
              public navCtrl: NavController,
              private formBuilder: FormBuilder, 
              public navParams: NavParams ) {
      this.todo = this.formBuilder.group({
      injured: ["injured", Validators.required],
      EnlistingDate: ['', Validators.required],
      branch: ['' ]
    });
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad WizardPage');
    console.log('Number of slides are :dcdcd');
   // this.lockNextSlide()
  }

//radio alert for qestionare 1: marine branches
  showRadio() {
    let alert = this.alertCtrl.create(
      {title:"Military Branched", 
      cssClass: "branchRadio"})

    alert.addInput({
      type: 'radio',
      label: 'Army',
      value: 'army',
      checked: false
    });

    alert.addInput({
      type: 'radio',
      label: 'Air Force',
      value: 'Air Force',
      checked: false
    });

    alert.addInput({
      type: 'radio',
      label: 'Coast Guards',
      value: 'Coast Guards',
      checked: false
    });

    alert.addInput({
      type: 'radio',
      label: 'Marines',
      value: 'Marines',
      checked: false
    });

    alert.addInput({
      type: 'radio',
      label: 'Navy',
      value: 'Navy',
      checked: false
    });
   

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
      console.log("OK", data);
      }
    });
    alert.present();
  }
  // end of 1st alert
  showRadioRank() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Lightsaber color');

    alert.addInput({
      type: 'radio',
      label: 'Private',
      value: 'private',
      checked: false
    });

    alert.addInput({
      type: 'radio',
      label: 'Sergent',
      value: 'sergent',
      checked: false
    });

    alert.addInput({
      type: 'radio',
      label: 'First Sergent',
      value: 'first sergent',
      checked: false
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
      console.log("OK", data);
      }
    });
    alert.present();
  }
  
  logForm(){
    console.log(this.todo.value)
  }

  nextButton: boolean = true;
  shouldLockSwipeToNext= false;

  // slideChanged() {
  //   let index = this.slides.getActiveIndex() 
  //   console.log(index);
  //   if(index == 5) {
      
  //   this.shouldLockSwipeToNext = true;
  //   this.lockNextSlide()
  //   } else {
  //     this.shouldLockSwipeToNext = false;
  //     this.lockNextSlide()
  //   }
  // }

  lockNextSlide(){
     ; //  shouldLockSwipeToNext can be either true/false
    this.slides.lockSwipeToNext(this.shouldLockSwipeToNext);
    console.log('Number of slides are :dcdcd'); 
  }
 
  //when navigating to the new slide when user clicks submit 
  onSubmit() {  
    this.shouldLockSwipeToNext = false;
    this.lockNextSlide()
    this.next();

    }

  next() {
    this.slides.slideNext(500);
  }

}
