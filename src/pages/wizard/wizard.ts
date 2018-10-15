import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, NavParams, Slides, AlertController, Platform } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
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
    this.thirdFormFunct();
    
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
      percentQuestionName: ["",]
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
  ondate() {
    const date1 = this.firstForm.get('vetQuestionName')
    console.log(date1)
  };

  secondFormFunct() {
    this.secondForm = this.formBuilder.group({
      lastEmployed: ["", ] 
    });

    this.secondForm.statusChanges
      .subscribe(val => {
        if(this.secondForm.valid == true) {
          console.log("valid", val)
          this.nextButton = false;
          this.shouldLockSwipeToNext = false;
        }else if( this.secondForm.valid == false) {
          console.log("not valid", val) 
          this.nextButton = true;
          this.shouldLockSwipeToNext = true;
        } 
        this.lockNextSlide()
      })
  };

  thirdFormFunct() {
    this.thirdForm = this.formBuilder.group({
      rank: ["", Validators.compose([ Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')])],
      MOS: ["", Validators.compose([ Validators.maxLength(9), Validators.required,  Validators.pattern('[0-9]+')]) ], 
      answer: ['', Validators.required]
    });

    this.thirdForm.statusChanges
      .subscribe(val => {
        console.log("status changed")
        console.log()
        if(this.thirdForm.valid == true) {
          console.log("valid", val)
          this.nextButton = false;
          this.shouldLockSwipeToNext = false;
        }else if( this.thirdForm.valid == false) {
          console.log("not valid", val) 
          this.nextButton = true;
          this.shouldLockSwipeToNext = true;
        } 
        this.lockNextSlide()
      })

  };
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
    if((index == 5 && !this.firstForm.valid) || (index == 6 && !this.secondForm.valid) || (index == 7 && !this.thirdForm.valid) || (index == 8))  {
      this.nextButton = true;
      this.shouldLockSwipeToNext = true;
    }else {
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
  submitIntent: boolean = false;
  onSubmitOne() {  
    if(this.branchValid && this.vetValid && this.disabilityValid && this.firstForm.valid) {
      this.shouldLockSwipeToNext = false;
      this.lockNextSlide()
      this.next();
      console.log("valid")
    } else {
      console.log("inavalid")
    }
    this.submitIntent = true;
  }

  next() {
    this.slides.slideNext(500);
  }

//radio alert for qestionnaire 1: marine branches
  branchValue: any = '';
  branchValid: boolean= false;
  branchTouched: boolean = false;
  showRadioBranch() {
    let branchAlert = this.alertCtrl.create(
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
           text: "Cancel",
           handler: _ => {
            // if(this.branchValue == undefined || '') {
            //   this.branchValid = false;
            // }
           }
        },
        {
          text: "Ok",
          handler: data => {
            if(data) {
              this.branchValid = true;
            } else {
              this.branchValid = false;
            }
            this.branchValue = data;
          }
        }]});
    branchAlert.didLeave
        .subscribe( _ => {
          this.branchTouched = true;
        })
    branchAlert.present();
   
  }
  
  // alert question for military rank
  
  logForm(){
    console.log(this.firstForm)
  }

  //alert for question 2: are you a vet or active member?
  vetValue: string = "";
  SeparationQuestion: string = "";
  vetValid: boolean = false;  
  vetTouched: boolean = false;
  showVetOptions() {
    let vetAlert = this.alertCtrl.create({
      message: "Select one",
      cssClass: "branchRadio"
    });
    vetAlert.setTitle('Military Status');

    vetAlert.addInput({
      type: 'radio',
      label: 'Veteran',
      value: 'Veteran',
      checked: false
    });

    vetAlert.addInput({
      type: 'radio',
      label: 'Active',
      value: 'Active',
      checked: false
    });
    vetAlert.addButton({
      text:'Cancel'
    });
    vetAlert.addButton({
      text: 'OK',
      handler: data => {
        if(data){
          if(data == "Active") {
            this.SeparationQuestion = "When is your separation date?"
          }else {
            this.SeparationQuestion = "When was your sepatation date?"
          }
          this.vetValid = true;
        }else if(data === undefined) {
          this.vetValid = false;
        }
        this.vetValue = data;
      }
    });
    vetAlert.didLeave
    .subscribe( _ => {
      this.vetTouched = true;
    })
    vetAlert.present();
  }
// question 3 servive disability
  //private _disabilityValue: string = '';
  // public get disabilityValue(): string {
  //   return this._disabilityValue;
  // }
  // public set disabilityValue(value: string) {
  //   this._disabilityValue = value;
  // }
 
  disabilityValid: boolean = false;
  disabilityQValue: string = "";
  disabilityTouched: boolean= false;

  showRadioDisability() {
    let disabilityAlert = this.alertCtrl.create(
      {
        title:"Dissability", 
        cssClass: "branchRadio", 
        message: "Select One"
      })

      disabilityAlert.addInput({
      type: 'radio',
      label: 'Yes',
      value: 'Yes',
      checked: false
    });

    disabilityAlert.addInput({
      type: 'radio',
      label: 'No',
      value: 'No',
      checked: false
    });
   
    disabilityAlert.addButton('Cancel');
    disabilityAlert.addButton({
      text: 'OK',
      handler: data => {
        const percentQuestion = this.firstForm.get('percentQuestionName')
        if(data) {
          if(data == "Yes") {  
            percentQuestion.setValidators(Validators.compose([ Validators.maxLength(3), Validators.required, Validators.pattern('^[1-9]$|^[1-9][0-9]$|^(100)$')]));
          }else if(data == 'No' ){           
            percentQuestion.clearValidators() 
          }
          this.disabilityValid = true;
        }else {
          percentQuestion.clearValidators() 
          this.disabilityValid = false;
        }
        percentQuestion.updateValueAndValidity()
        this.disabilityQValue = data; 
      }      
    });
    disabilityAlert.didLeave
      .subscribe( _ => {
        this.disabilityTouched = true;
      })
    disabilityAlert.present(); 
  }

  //questionnaire ######2222222
  // show employed question
  employedInvalid: boolean = true;
  employedTouched: boolean = false;
  employedAnswer: string= "";
  showEmployedRadio() {
    let alert = this.alertCtrl.create({
      message: "Select one",
      cssClass: "branchRadio"
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
        const lastEmployed = this.secondForm.get("lastEmployed")
        if(data == "Unemployed"){
          this.employedInvalid = false;
          lastEmployed.setValidators(Validators.required)
        } else if(data === "Employed") {
          this.employedInvalid = false;
          lastEmployed.clearValidators()
        } else {
          this.employedInvalid = true;
          lastEmployed.clearValidators()
        }
        this.employedAnswer = data;
        lastEmployed.updateValueAndValidity()
      } 
    });
    alert.didLeave
    .subscribe( _ => {
      this.employedTouched = true;
    })

    alert.present();
  }

  //question 2) Married
  marriedAnswer: string = '';
  marriedValid: boolean = false;
  marriedTouched: boolean = false;
  showMarriedAlert() {
    let marriedAlert = this.alertCtrl.create(
      {
        title:"Married Status", 
        cssClass: "branchRadio", 
        message: "Select One"
      })

      marriedAlert.addInput({
      type: 'radio',
      label: 'Yes',
      value: 'Yes',
      checked: false
    });

    marriedAlert.addInput({
      type: 'radio',
      label: 'No',
      value: 'No',
      checked: false
    });
  
    marriedAlert.addButton('Cancel');
    marriedAlert.addButton({
      text: 'OK',
      handler: data => {
        this.marriedAnswer = data;
        if(data) {
          this.marriedValid = true; 
        }else {
          this.marriedValid = false; 
        }
      }
    });
    marriedAlert.didLeave
    .subscribe( _ => {
      this.marriedTouched = true;
    })
    marriedAlert.present(); 
  }

  gender: any;

  onSelect() {
    console.log(this.gender)
  }

  logFormTwo(){
    console.log(this.thirdForm)
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

