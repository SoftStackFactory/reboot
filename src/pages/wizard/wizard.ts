import { Component, ViewChild, OnInit } from '@angular/core';
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
export class WizardPage implements OnInit {

  private firstForm : FormGroup;
  private secondForm : FormGroup;
  private thirdForm : FormGroup;

  get percentQuestion() {
    return this.firstForm.get('percentQuestionName')
  }
 // index: number;

  @ViewChild(Slides) slides: Slides;
 
  constructor( public alertCtrl: AlertController, 
              public navCtrl: NavController,
              private formBuilder: FormBuilder, 
              public navParams: NavParams, 
              public plt: Platform
             ) {
      // let required = null;
    this.firstFormFunct(); 
    this.secondFormFunct();
  }

  ngOnInit() {}
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad WizardPage');
   // ===> checks if slide is the beggining <==
    // if (this.slides.isBeginning()){
    //   console.log("beg")
    // } else {
    //   console.log("not beg")
    //   let index = this.slides.getActiveIndex() 
    // console.log(index);
    // }
  //  this.lockNextSlide()
 
  setTimeout( _ => {
  this.slideChanged() 
  }, 300 );
 };
  
  firstFormFunct() {
    this.firstForm = this.formBuilder.group({
      vetQuestionName: ['', Validators.compose([Validators.required])],
      percentQuestionName: ["", Validators.compose([ Validators.maxLength(3), Validators.pattern('^[1-9]$|^[1-9][0-9]$|^(100)$')])]
    });

    // this.firstForm.get('vetQuestionName').valueChanges
    //   .subscribe( value => {
    //     console.log(value, "value changed")
    //     const percentQuestion = this.firstForm.get('percentQuestionName')
    //     console.log(percentQuestion, "percentQuestion")
    //     if(value) {
    //       percentQuestion.setValidators(Validators.required);
    //       console.log("if -setValidators")
    //     } else {
    //       percentQuestion.clearValidators() 
    //       console.log("else -clearValidators")
    //     }        
    //     percentQuestion.updateValueAndValidity()
    //     console.log("subscribe: updateValue")
    //   });

    this.firstForm.statusChanges
      .subscribe(val => {
        console.log("status changed")
        console.log
        if(this.firstForm.valid == true) {
          console.log("valid", val)
          this.nextButton = false;
          this.shouldLockSwipeToNext = false;
        }else if( this.firstForm.valid == false) {
          console.log("not valid", val) 
          this.nextButton = true;
          this.shouldLockSwipeToNext = true;
        } 
        this.lockNextSlide()
      })
  };

  secondFormFunct() {
    this.secondForm = this.formBuilder.group({
      lastEmployed: ["", Validators.required] 
    });

    this.secondForm.statusChanges
      .subscribe(val => {
        console.log("status changed")
        console.log
        if(this.firstForm.valid == true) {
          console.log("valid", val)
          this.nextButton = false;
          this.shouldLockSwipeToNext = false;
        }else if( this.firstForm.valid == false) {
          console.log("not valid", val) 
          this.nextButton = true;
          this.shouldLockSwipeToNext = true;
        } 
        this.lockNextSlide()
      })

  }
  // ionViewWillLoad() {
  //   //this.nextButton = false;
  //   console.log("will")
  // }
  // formChanged() {
  //   console.log(this.firstForm)
  // }
  // formChanged() {
  //   if(this.disabilityDisplay == "Yes"){
  //     if(this.firstForm.valid == true && this.branchDisplay != '' && this.vetDisplay != "" ) {
  //       console.log("valid", "yesDisability" )
  //     } 
  //   } else if(this.disabilityDisplay == "No") {
  //     if(this.branchDisplay !="" && this.vetDisplay !='' ) {

  //     }
  //    }
  //  }

  // "if slide is questionnaire, then block slide-to-next option"
  nextButton: boolean = false;
  shouldLockSwipeToNext: boolean = false;
  slideChanged() {
    let index = this.slides.realIndex; 
    console.log(index);
    if(index == 5 && !this.firstForm.valid) {
      this.nextButton = true;
      this.shouldLockSwipeToNext = true;
    }else if(index == 6 && !this.secondForm.valid) {
      this.nextButton = true;
      this.shouldLockSwipeToNext = true;
    }
    else {
        this.nextButton = false;
        this.shouldLockSwipeToNext = false;
    }
    this.lockNextSlide()
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
          console.log(this.firstForm, this.firstForm.valid)
        }
        }]});

    alert.present();
  }
  // alert question for military rank
  
  logForm(){
    console.log(this.firstForm)
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
        this.vetDisplay = data;
        console.log(data, "DATA");
        if(data == "Active") {
          this.vetSelection = true;
          this.vetQuestion = "When is your separation date?"
          console.log(this.vetQuestion)
        }else if(data == "Veteran") {
          this.vetSelection = true;
          this.vetQuestion = "When was your sepatation date?"
        }else if(data === undefined) {
          this.vetSelection = false;
        }
      }
    });
    alert.present();
  }
// question 3 servive disability
  private _disabilityValue: string = '';
  // public get disabilityValue(): string {
  //   return this._disabilityValue;
  // }
  // public set disabilityValue(value: string) {
  //   this._disabilityValue = value;
  // }
  hasDisability: boolean = false;
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
        this._disabilityValue = data; 
        console.log("OK", data);
        const percentQuestion = this.firstForm.get('percentQuestionName')
        if( data !== undefined) {
          if(data == "Yes") {
            this.hasDisability = true;
            console.log(this.hasDisability, "Yes has disability")
            percentQuestion.setValidators(Validators.compose([ Validators.maxLength(3), Validators.required, Validators.pattern('^[1-9]$|^[1-9][0-9]$|^(100)$')]));
            console.log("if -setValidators")
          } else if(data == "No"){          
            this.hasDisability = false; 
            console.log(this.hasDisability, "NO has disability")
            percentQuestion.clearValidators() 
            console.log("else -clearValidators")
          }
          percentQuestion.updateValueAndValidity()
          console.log("handler: updateValue")
        }else {

        }
      
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
        console.log(this.secondForm.valid, "2ndformValid?")
        console.log(this.secondForm, "2ndform")
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

  logFormTwo(){
    console.log(this.secondForm)
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

