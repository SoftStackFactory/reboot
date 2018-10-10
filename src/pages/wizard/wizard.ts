import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, AlertController, Platform } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { createOfflineCompileUrlResolver } from '@angular/compiler';

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
  percentQrequired: any = "required"
 // index: number;

  @ViewChild(Slides) slides: Slides;
 
  constructor( public alertCtrl: AlertController, 
              public navCtrl: NavController,
              private formBuilder: FormBuilder, 
              public navParams: NavParams, 
              public plt: Platform
             ) {
      // let required = null;
      this.todo = this.formBuilder.group({
        VetQuestionName: ['', Validators.compose([Validators.required])],
        PercentageQuestionName: ["", Validators.compose([ Validators.maxLength(3), Validators.pattern('^[1-9]$|^[1-9][0-9]$|^(100)$')])]
    });

    this.todo.statusChanges.subscribe(val => {
      console.log("status changed")
      if(this.todo.valid == true) {
        console.log("valid", val)
      } else if( this.todo.valid == false) {
        console.log("not valid", val) 
      } 
    })
   
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad WizardPage');
    console.log(this.nextButton)

    //===> checks if slide is the beggining <==
  //   if (this.slides.isBeginning()){
  //     console.log("beg")
  //   } else {
  //     console.log("not beg")
  //     let index = this.slides.getActiveIndex() 
  //   console.log(index);
  //   }
  //  this.lockNextSlide()
   //==> when platform is ready, calls a function
   this.plt.ready().then((readySource) => {
    console.log('Platform ready from', readySource);
   let index = this.slides.getActiveIndex() 
   console.log(index);
    });
  // this.slideChanged(null)
  setTimeout( _ => {

  this.slideChanged(null) 
    if (this.slides.isBeginning()){
      console.log("beg")
    } else {
      console.log("not beg")
      let index = this.slides.getActiveIndex() 
      console.log(index);
    }
   //this.lockNextSlide()
  },
   300 )
  
  }

  ionViewWillLoad() {
    //this.nextButton = false;
    console.log("will")
  }
  // formChanged() {
  //   if(this.disabilityDisplay == "Yes"){
  //     if(this.todo.valid == true && this.branchDisplay != '' && this.vetDisplay != "" ) {
  //       console.log("valid", "yesDisability" )
  //     } 
  //   } else if(this.disabilityDisplay == "No") {
  //     if(this.branchDisplay !="" && this.vetDisplay !='' ) {

  //     }
  //   }
  // }

  nextButton: boolean = false;
  shouldLockSwipeToNext: boolean = false;
  slideChanged(event) {
    console.log(event)
    let index = this.slides.realIndex; 
    console.log(index);
    if(index == (5 || 6) ) {
      this.nextButton = true;
      this.shouldLockSwipeToNext = true;
      this.lockNextSlide()
      console.log(5)
    }else {
        this.nextButton = false;
        this.shouldLockSwipeToNext = false;
        this.lockNextSlide()
        console.log(5)
    }
  }

  lockNextSlide(){
      //  shouldLockSwipeToNext can be either true/false
    this.slides.lockSwipeToNext(this.shouldLockSwipeToNext);
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


//radio alert for qestionnaire 1: marine branches
  branchDisplay: any = '';
  showRadioBranch() {
    let alert = this.alertCtrl.create(
      {title:"Military Branch", 
      cssClass: "branchRadio", 
      message: "Select One", 
      inputs : [
        {
          type:'radio',
          label:'Air Force',
          value:'Air Force',
          checked: false
        },
        {
            type:'radio',
            label:'Army',
            value:'Army',
            checked: false
        },
        {
            type:'radio',
            label:'Coast Guards',
            value:'Coast Guards',
            checked: false
        },
        {
          type:'radio',
          label:'Marines',
          value:'Marines',
          checked: false
        },
        {
          type:'radio',
          label:'Navy',
          value:'Navy',
          checked: false
        }
      ],
        buttons : [
        {
            text: "Cancel"
        },
        {
            text: "Ok",
            handler: data => {
            console.log(data, alert);
            this.branchDisplay = data;
            console.log(this.todo, this.todo.valid)
            }
        }]});

    alert.present();
  }
  // alert question for military rank
  
  logForm(){
    console.log(this.todo.value)
  }
  //alert for question 2: are you a vet or active member?
  vetSelection: boolean = false;
  vetDisplay: string = "";
  vetQuestion: string = "";

  showVetOptions() {
    let alert = this.alertCtrl.create({
      message: "Select one"
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
        this.vetSelection = true;
        this.vetDisplay = data;
        if(data == "Active") {
          this.vetQuestion = "When is your separation date?"
          console.log(this.vetQuestion)
        } else if(data == "Veteran") {
          this.vetQuestion = "When was your sepatation date?"
        }
      }
    });
    alert.present();
  }
// question 3 servive disability
  hasDisability: boolean = false;
  disabilityDisplay: string = '';
  disabilityRequired: boolean= true;
  showRadioDisability() {
    let alert = this.alertCtrl.create(
      {
        title:"Dissability", 
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
          this.disabilityRequired = true;
          this.hasDisability = true;
        } else if(data == "No"){
          this.disabilityRequired = false;
          this.percentQrequired = null;
          this.hasDisability = false; 
          console.log(this.hasDisability)
        }
        this.disabilityDisplay = data;
      }
    });

    alert.present(); 
  }

  //questionnaire ######2222222
  // show employed question
  showUnemployed: boolean = false;
  employedAnswer: string= "";
  showEmployedRadio() {
    let alert = this.alertCtrl.create({
      message: "Select one"
    });
    alert.setTitle('Employment');

    alert.addInput({
      type: 'radio',
      label: 'Employed',
      value: 'Employed',
      checked: false
    });

    alert.addInput({
      type: 'radio',
      label: 'Unemployed',
      value: 'Unemployed',
      checked: false
    });
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        console.log("OK", data);
        this.employedAnswer = data;
        if(data == "Unemployed"){
          this.showUnemployed = true;
        } else if(data == "Employed"){
        this.showUnemployed = false;
         }
        } 
    });
    alert.present();
  }

  //question 2) Married
  marriedAnswer: string = '';
  showMarriedAlert() {
    let alert = this.alertCtrl.create(
      {
        title:"Married Status", 
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
        this.marriedAnswer = data;
        if(data == "Yes") {
          
        } else if(data == "No"){
         
        }
      
      }
    });

    alert.present(); 
  }

  logForm2() {
    
  }
  // showRadioRank() {
  //   let alert = this.alertCtrl.create({
  //     message:"Select One"
  //   });
  //   alert.setTitle('Military Rank');

  //   alert.addInput({
  //     type: 'radio',
  //     label: 'Private',
  //     value: 'private',
  //     checked: false
  //   });

  //   alert.addInput({
  //     type: 'radio',
  //     label: 'Sergent',
  //     value: 'Sergent',
  //     checked: false
  //   });

  //   alert.addInput({
  //     type: 'radio',
  //     label: 'First Sergent',
  //     value: 'first Sergent',
  //     checked: false
  //   });

  //   alert.addButton('Cancel');
  //   alert.addButton({
  //     text: 'OK',
  //     handler: data => {
  //     console.log("OK", data);
  //     }
  //   });
  //   alert.present();
  // }
}

