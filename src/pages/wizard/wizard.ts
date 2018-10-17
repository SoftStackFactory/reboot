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
 vetValue: string = "";
 SeparationQuestion: string = "";
 // disability question properties
 
 disabilityQValue: string = "";
 
  firstFormFunct() {
    this.firstForm = this.formBuilder.group({
      branch:  ['', Validators.compose([Validators.required])],
      vetOrActive: ['', Validators.compose([Validators.required])],
      separationDate: ['', Validators.compose([Validators.required])],
      disability: ['', Validators.compose([Validators.required])],
      percentQuestion: ["",]
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
        console.log("status changed", val)
        if(this.firstForm.valid == true) {
          this.nextButton = false;
          this.shouldLockSwipeToNext = false;
        }else if( this.firstForm.valid == false) {
          this.nextButton = true;
          this.shouldLockSwipeToNext = true;
        } 
        this.lockNextSlide()
      })

    this.firstForm.controls.vetOrActive.valueChanges
      .subscribe( val =>{
        if(val =="Active") {
          this.SeparationQuestion = "When is your separation date?"
        }else if(val == "Veteran") {
          this.SeparationQuestion = "When was your sepatation date?"
        }else {
          this.SeparationQuestion = "";
        }
      this.vetValue = val;
       })
      
    this.firstForm.controls.disability.valueChanges
      .subscribe( data => {
        const percentQuestion = this.firstForm.get('percentQuestion')
        if(data == "disability") {  
          percentQuestion.setValidators(Validators.compose([ Validators.maxLength(3), Validators.required, Validators.pattern('^[1-9]$|^[1-9][0-9]$|^(100)$')]));
        }else {           
          percentQuestion.clearValidators() 
        }
        //percentQuestion.updateValueAndValidity()
        this.disabilityQValue = data; 
      })
  };
 
  employedAnswer: string= "";
  secondFormFunct(){
    this.secondForm = this.formBuilder.group({
      employment: [''],
      lastEmployed: ['', Validators.compose([Validators.required])],
      marriage: ['', Validators.compose([Validators.required])],
    });

    this.secondForm.statusChanges
      .subscribe(val => {
        if(this.secondForm.valid == true) {
          this.nextButton = false;
          this.shouldLockSwipeToNext = false;
        }else if( this.secondForm.valid == false) {
          this.nextButton = true;
          this.shouldLockSwipeToNext = true;
        } 
        this.lockNextSlide()
        console.log(this.secondForm)
      })

    this.secondForm.controls.employment.valueChanges
      .subscribe( data => {
        const employmentQuestion = this.secondForm.get('employment')
        if(data == "Unemployed") { 
          employmentQuestion.setValidators(Validators.compose([ Validators.required]));
        }else {
          employmentQuestion.clearValidators() 
          return
        }
        // employmentQuestion.updateValueAndValidity()
        this.employedAnswer = data; 
        return
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
    console.log(this.firstForm)
    if( this.firstForm.valid) {
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
  vetOrActiveOptions: any = {
    title: 'Military Status',
    message: 'Select one option',
    class: 'branchRadio',
    buttons: [
      {
         text: "Cancel",
      },
      {
        text: "Ok",
        handler: data => {
          console.log(data)
        }
      } 
    ]  
  }
      
  // alert question for military rank
 //alert for question 2: are you a vet or active member?  

  //questionnaire ######2222222
  // show employed question
  

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

  logForm(){
    console.log(this.firstForm)
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

