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
        percentQuestion.updateValueAndValidity()
        this.disabilityQValue = data; 
      })
  };
 
  employedAnswer: string= "";
  secondFormFunct(){
    this.secondForm = this.formBuilder.group({
      employment: ['', Validators.compose([Validators.required])],
      lastEmployed: [''],
      marriage: ['', Validators.compose([Validators.required])],
    });
    //1 do a [] bracked in "" to have only one subscribe stautsChange
    //have only one selectOptions

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
//if error 'infinite loop comment out .upadateValueAndValidity()'
    this.secondForm.controls.employment.valueChanges
      .subscribe( data => {
        const employmentQuestion = this.secondForm.get('lastEmployed')
        if(data == "Unemployed") { 
          console.log("#1")
          employmentQuestion.setValidators(Validators.compose([ Validators.required]));
        }else {
          employmentQuestion.clearValidators() 
          console.log("#2") 
        }
        console.log(employmentQuestion, "#3")
        employmentQuestion.updateValueAndValidity()
        this.employedAnswer = data; 
        return
      })
  };

  thirdFormFunct() {
    this.thirdForm = this.formBuilder.group({
      rank: ["", Validators.compose([ Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')])],
      MOS: ["", Validators.compose([ Validators.maxLength(9), Validators.required,  Validators.pattern('[0-9]+')]) ]
    });
  };
  // "if slide is questionnaire, then block slide-to-next option"
  next() {
    this.slides.slideNext(500);
  }
  lockNextSlide(){
    //  shouldLockSwipeToNext can be either true/false
    this.slides.lockSwipeToNext(this.shouldLockSwipeToNext);
  }

  nextButton: boolean = false;
  shouldLockSwipeToNext: boolean = false;
  slideChanged() {
    let index = this.slides.realIndex; 
    console.log(index);
    if((index == 5 && !this.firstForm.valid) || (index == 6 && !this.secondForm.valid) || (index == 8 ) || (index == 7))  {
      this.nextButton = true;
      this.shouldLockSwipeToNext = true;
    }else {
        this.nextButton = false;
        this.shouldLockSwipeToNext = false;
    }
    this.lockNextSlide()
  }
 
  //when navigating to the new slide when user clicks submit 
  //submitIntent: boolean = false;
  // onSubmitOne() {  
  //   console.log(this.firstForm)
  //   if( this.firstForm.valid) {
  //     this.shouldLockSwipeToNext = false;
  //     this.lockNextSlide()
  //     this.next();
  //     console.log("valid")
  //   } else {
  //     console.log("inavalid")
  //   }
  //   this.submitIntent = true;
  // }

  customizeSelectOptions(title: string, message: string ) {
   let obj: object = {
     title: title,
     message: message,
     cssClass: 'branchRadio',
   }
   return obj;
  }

  branchOption = this.customizeSelectOptions("Military Branch", "Select a branch");
  vetOrActiveOptions = this.customizeSelectOptions("Military Status", "Select one");
  disabilityOptions = this.customizeSelectOptions("Disability Status", "Select one");
  UnemployedOptions = this.customizeSelectOptions("Employement Status", "Select one");
  marriageOptions = this.customizeSelectOptions("Marriage Status","Select one");
 
  onSubmit() {
    let userData: object = {
      branch: this.firstForm.value.branch,
      veteranOrActive: this.firstForm.value.vetOrActive,
      separationDate: this.firstForm.value.separationDate,
      disabilityStatus: this.firstForm.value.disability,
      disabilityPercent: this.firstForm.value.percentQuestion,
      employmentStatus: this.secondForm.value.employment,
      lastEmployed: this.secondForm.value.lastEmployed,
      marriageStatus: this.secondForm.value.marriage,
      militaryRank: this.thirdForm.value.rank,
      MOS: this.thirdForm.value.MOS
    }
    this.shouldLockSwipeToNext = false;
    this.lockNextSlide()
    this.next();
    this.slides.lockSwipeToPrev(true);
  }

}

