import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, AlertController, Platform, MenuController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
// import { createOfflineCompileUrlResolver, ProviderAst } from '@angular/compiler';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { SelfAssessmentPage } from '../../pages/self-assessment/self-assessment';
import { UserProvider } from '../../providers/user/user';
import * as moment from 'moment';
import { LoginPage } from '../../pages/login/login';

/**
 * Generated class for fthe WizardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

interface UserData {
  firstName: string;
}

@Component({
  selector: 'page-wizard',
  templateUrl: 'wizard.html',
})
export class WizardPage {

  private firstForm: FormGroup;
  private secondForm: FormGroup;
  private thirdForm: FormGroup;
  private name: string;

  private today = new Date().toISOString();

  get percentQuestion() {
    return this.firstForm.get('percentQuestionName')
  }
  // index: number;

  leftArrowVisible: boolean = false;
  rightArrowVisible: boolean = true;
  vetValue: string = "";
  SeparationQuestion: string = "";
  disabilityQValue: string = "";
  LockSwipeToPrev: boolean = true;
  employedAnswer: string = "";
  codeErrorMessage: string = "";


  @ViewChild(Slides) slides: Slides;

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public navParams: NavParams,
    public plt: Platform,
    public user: UserProvider,
    private menuCtrl: MenuController) {

    this.user.getUser()
      .subscribe((data: UserData) => {
        this.name = data.firstName;
      })
  
      this.firstFormFunct();
      this.secondFormFunct();
      this.thirdFormFunct();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WizardPage');
    setTimeout(_ => {
      this.slideChanged()
    }, 300);
  }


   //the logic that determines if slide should be locked from swiping and in which direction
  slideChanged() {
    this.leftOrRightArrow();
    let index = this.slides.realIndex;
    if(index == 0) {
      this.slides.lockSwipeToPrev(true);
    } 
    else if ((index == 5 && !this.firstForm.valid) || (index == 6 && !this.secondForm.valid) || index == 7) {
      index == 5 ? this.slides.lockSwipeToPrev(true) : this.slides.lockSwipeToPrev(false);
      this.slides.lockSwipeToNext(true)
    } 
    else if(index == 8) {
      this.slides.lockSwipes(true);
    }
    else {
      if(index == 5) {
        this.slides.lockSwipeToPrev(true);
        this.slides.lockSwipeToNext(false);
      } else {
        this.slides.lockSwipes(false);      
      }
    }
  }

  //declare firstForm; set contol names; set validators
  firstFormFunct() {
    this.firstForm = this.formBuilder.group({
      branch: ['', Validators.compose([Validators.required])],
      vetOrActive: ['', Validators.compose([Validators.required])],
      separationDate: ['', Validators.compose([Validators.required])],
      disability: ['', Validators.compose([Validators.required])],
      percentQuestion: ["",]
    });

    //sets requirements depending on the branch that users select:
    //1) the observable for branch checks if the vslue changes and runs a function in the parameter
    //2) gets the form Control 'MOS' and set it as a local variable
    //3 sets validators to the local variable depending on the condition: "setValidators"
    //4 update value and validators: 'updateValueAnValidity()'
    this.firstForm.controls.branch.valueChanges
      .subscribe(val => {
        const codeNumber = this.thirdForm.get('MOS')
        if (val == "Air Force") {
          codeNumber.setValidators(Validators.compose([Validators.maxLength(5), Validators.required, Validators.pattern('^[A-Za-z0-9]+$')]));
          this.codeErrorMessage = "Letters and numbers. 5 max"
        } else if (val == "Army") {
          codeNumber.setValidators(Validators.compose([Validators.maxLength(3), Validators.required, Validators.pattern('[A-Za-z0-9]+$')]));
          this.codeErrorMessage = "Letters and number. 3 max"
        } else if (val == "Marines") {
          codeNumber.setValidators(Validators.compose([Validators.maxLength(4), Validators.required, Validators.pattern('^[0-9]+$')]));
          this.codeErrorMessage = "enter 4 digit number"
        } else if (val == "Navy") {
          codeNumber.setValidators(Validators.compose([Validators.maxLength(3), Validators.required, Validators.pattern('[a-zA-Z ]+$')]));
          this.codeErrorMessage = "Enter a maximum of 3 letters"
        } else if (val == 'Coast Guard') {
          codeNumber.setValidators(Validators.compose([Validators.maxLength(9), Validators.required, Validators.pattern('[A-Za-z0-9]+$')]))
          this.codeErrorMessage = "Max 9 characters"
        }
        codeNumber.updateValueAndValidity()
        this.disabilityQValue = val;
      })
    //1) when value changes makes separation data appear and change wording depending on conditions
    //2) sets validators if 'active'; clears validators if 'veteran'
    this.firstForm.controls.vetOrActive.valueChanges
      .subscribe(val => {
        // const enlistedPay = this.thirdForm.get('enlistedPay')
        if (val == "Veteran") {
          this.SeparationQuestion = "When was your separation date?"
          // enlistedPay.setValidators(Validators.compose([Validators.required,]));
        } else if (val == "Active" || "Guard/Reserve") {
          this.SeparationQuestion = "When is your separation date?"
          // enlistedPay.clearValidators();
        }
        this.vetValue = val;
        // enlistedPay.updateValueAndValidity()
      })
    //when value changes for disability question change validator requirements for percentQuestion depending on condition
    this.firstForm.controls.disability.valueChanges
      .subscribe(data => {
        const percentQuestion = this.firstForm.get('percentQuestion')
        if (data == "Disability") {
          percentQuestion.setValidators(Validators.compose([Validators.max(100), Validators.min(1), Validators.required]));
        } else {
          percentQuestion.clearValidators()
        }
        percentQuestion.updateValueAndValidity()
        this.disabilityQValue = data;
      })
  };

  //declare SecondForm; set contol names; set validators
  secondFormFunct() {
    this.secondForm = this.formBuilder.group({
      employment: ['', Validators.compose([Validators.required])],
      lastEmployed: [''],
      marital: ['', Validators.compose([Validators.required])],
    });
    //if error 'infinite loop' comment out .upadateValueAndValidity()'
    //when value changes for employment question, set validators for lastEmployment question and update form depending if marked as unemployed
    this.secondForm.controls.employment.valueChanges
      .subscribe(data => {
        const employmentQuestion = this.secondForm.get('lastEmployed')
        if (data == "Unemployed") {
          employmentQuestion.setValidators(Validators.compose([Validators.required]));
        } else {
          employmentQuestion.clearValidators()
        }
        employmentQuestion.updateValueAndValidity();
        this.employedAnswer = data;
      })
  };

  //declare thirdForm; set contol names; set validators
  thirdFormFunct() {
    this.thirdForm = this.formBuilder.group({
      rank: ["", Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*')])],
      // insignia: ['', Validators.compose([Validators.required])],
      // enlistedPay: [''],
      MOS: ["", Validators.compose([Validators.required])]
    });
  };
  // called when users click on nav bar 'next' button; only enabled when forms are valid
  exit() {
    window.sessionStorage.clear()
    this.menuCtrl.enable(false);
    this.menuCtrl.swipeEnable(false); 
    this.navCtrl.setRoot(LoginPage, {}, {animate: true, direction: "forward"});
  }
  // Determines if the left and right arrows should be displayed
  leftOrRightArrow() {
    if(this.slides.getActiveIndex()  === 0){
      this.leftArrowVisible = false; 
    } 
    else if (this.slides.getActiveIndex() === 8) {
      this.leftArrowVisible = false;
      this.rightArrowVisible = false;
    } 
    else if (this.slides.getActiveIndex()  === 5) {
      this.leftArrowVisible = false;
    } 
    else if (this.slides.getActiveIndex() === 7) {
      this.rightArrowVisible = false;
    } 
    else {
      this.leftArrowVisible = true;
      this.rightArrowVisible = true;
    }
  }

  //Transitions to prev slide
  back() {
    this.slides.slidePrev(500);
  }

  //Transitions to next slide
  next() {
    this.slides.slideNext(500);
  }

  customizeSelectOptions(title: string, message: string) {
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
  unemployedOptions = this.customizeSelectOptions("Employment Status", "Select one");
  maritalOptions = this.customizeSelectOptions("Marital Status", "Select one");
  rankOptions = this.customizeSelectOptions("Military Rank", "Select one");

  // insigniaOptions = this.customizeSelectOptions("Officer Rank Insignia", "Select one")
  // enlistedPayOptions = this.customizeSelectOptions("Enlisted Pay Rank", "Select one")

  onSubmit() {
    this.user.userData = {
      militaryBranch: this.firstForm.value.branch,
      veteranOrActive: this.firstForm.value.vetOrActive,
      separationDate: this.firstForm.value.separationDate,
      disabilityStatus: this.firstForm.value.disability,
      disabilityPercentage: this.firstForm.value.percentQuestion,
      employmentStatus: this.secondForm.value.employment,
      lastEmployed: this.secondForm.value.lastEmployed,
      maritalStatus: this.secondForm.value.marital,
      militaryRank: this.thirdForm.value.rank,
      // officerRank: this.thirdForm.value.insignia,
      // enlistingPay: this.thirdForm.value.enlistedPay,
      codeIdentifier: this.thirdForm.value.MOS,
    }

    this.user.updateUserModel(this.user.userData)
      .subscribe(
        (data) => {
          console.log(data, "YEY!!!!!!")
          this.slides.lockSwipeToNext(false);
          this.next();
        },
        (err) => {
          console.log(err);
          // alert("Please try submitting again.")
        })
        //Skip validation for demo purposes only
        // this.slides.lockSwipeToNext(false);
        // this.next();
  }

  setDashboardPage() {
    this.navCtrl.setRoot(DashboardPage) 
  }

  setAssessmentPage() {
    this.navCtrl.setRoot(SelfAssessmentPage)
  }

  calcDate() {
    let sepDate = moment(this.firstForm.value.separationDate, "YYYY-MM-DD").toDate().getTime();
    let now = new Date().getTime();
    let diff = sepDate - now;
    return Math.ceil(diff/86400000);
  }
}

