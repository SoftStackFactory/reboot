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

//radio alert for qestionnaire 1: marine branches
  branchDisplay: any = '';
  showRadioBranch() {
    let alert = this.alertCtrl.create(
      {title:"Military Branch", 
      cssClass: "branchRadio", 
      message: "Select One"})

    alert.addInput({
      type: 'radio',
      label: 'Army',
      value: 'Army',
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
      this.branchDisplay = data;
      }
    });
    alert.present();
  }
  // alert question for military rank
  
  showRadioRank() {
    let alert = this.alertCtrl.create({
      message:"Select One"
    });
    alert.setTitle('Military Rank');

    alert.addInput({
      type: 'radio',
      label: 'Private',
      value: 'private',
      checked: false
    });

    alert.addInput({
      type: 'radio',
      label: 'Sergent',
      value: 'Sergent',
      checked: false
    });

    alert.addInput({
      type: 'radio',
      label: 'First Sergent',
      value: 'first Sergent',
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
  //alert for question 2: are you a vet or active member?
  vetSelection: boolean = false;
  activeSelection: boolean = false;
  vetDisplay: string = "";
  showVetOptions() {
    let alert = this.alertCtrl.create({
      message: "Select One"
    });
  alert.setTitle('Military Status');

  alert.addInput({
    type: 'radio',
    label: 'Veteran',
    value: 'Veteran',
    checked: false
  });

  alert.addInput({
    type: 'radio',
    label: 'Active',
    value: 'Active',
    checked: false
  });
  alert.addButton('Cancel');
  alert.addButton({
    text: 'OK',
    handler: data => {
    console.log("OK", data);
      if(data == "Active") {
        this.activeSelection = true;
        this.vetSelection = false;
      }
      else if(data == "Veteran") {
        this.activeSelection = false;
        this.vetSelection = true;
      }
      this.vetDisplay = data;
    }
  });
  alert.present();
}
// question 3 servive disability
  hasDisability: boolean = false;
  disabilityDisplay: string = '';
  showRadioDisability() {
    let alert = this.alertCtrl.create(
      {
        title:"Military Branch", 
        cssClass: "branchRadio", 
        message: "Select One"
      })

    alert.addInput({
      type: 'radio',
      label: 'Yes',
      value: 'Yes',
      checked: false
    });

    alert.addInput({
      type: 'radio',
      label: 'No',
      value: 'No',
      checked: false
    });
   

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
      console.log("OK", data);
      if(data == "Yes") {
        this.hasDisability = true;
      }
      this.disabilityDisplay = data;
    }
    });

    alert.present(); 
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
