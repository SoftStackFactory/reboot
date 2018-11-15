import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, AlertController, Platform } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { createOfflineCompileUrlResolver, ProviderAst } from '@angular/compiler';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { TransitionPage } from '../../pages/transition/transition';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for fthe WizardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-wizard',
  templateUrl: 'wizard.html',
})
export class WizardPage {

  private firstForm: FormGroup;
  private secondForm: FormGroup;
  private thirdForm: FormGroup;
  
  private today = new Date().toISOString();

  get percentQuestion() {
    return this.firstForm.get('percentQuestionName')
  }
  // index: number;

  @ViewChild(Slides) slides: Slides;

  constructor(public alertCtrl: AlertController,
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public navParams: NavParams,
    public plt: Platform,
    public user: UserProvider
  ) {
    // let required = null;
    this.firstFormFunct();
    this.secondFormFunct();
    this.thirdFormFunct();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WizardPage');
    setTimeout(_ => {
      this.slideChanged()
    }, 300);
  };
  vetValue: string = "";
  SeparationQuestion: string = "";
  disabilityQValue: string = "";
  nextButtonDisabled: boolean = false;
  shouldLockSwipeToNext: boolean = false;
  LockSwipeToPrev: boolean = false;
  employedAnswer: string = "";
  codeErrorMessage: string = "";

  disableSwipe() {
    this.nextButtonDisabled = true;
    this.shouldLockSwipeToNext = true;
  }

  eneableSwipe() {
    this.nextButtonDisabled = false;
    this.shouldLockSwipeToNext = false;
  }
  //callled when status changes for forms
  statusChangeFunct(valid: boolean) {
    if (valid == true) {
      this.eneableSwipe()
    } else if (valid == false) {
      this.disableSwipe()
    }
    this.lockNextSlide()
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
    //observable called when status of firstForm changes => calls function that enables or disabled swipe if conditions are met
    this.firstForm.statusChanges
      .subscribe(val => {
        this.statusChangeFunct(this.firstForm.valid)
      })
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
        } else if (val == 'Coast Guards') {
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
        const enlistedPay = this.thirdForm.get('enlistedPay')
        if (val == "Active") {
          this.SeparationQuestion = "When is your separation date?"
          enlistedPay.setValidators(Validators.compose([Validators.required,]));
        } else if (val == "Veteran") {
          this.SeparationQuestion = "When was your sepatation date?"
          enlistedPay.clearValidators();
        }
        this.vetValue = val;
        enlistedPay.updateValueAndValidity()
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
    //when status changes call function to lock or unlock swipe dependign if form is valid
    this.secondForm.statusChanges
      .subscribe(val => {
        this.statusChangeFunct(this.secondForm.valid)
      })
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
      rank: ["", Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')])],
      insignia: ['', Validators.compose([Validators.required])],
      enlistedPay: [''],
      MOS: ["", Validators.compose([Validators.required])]
    });
  };
  // called when users click on nav bar 'next' button; only enabled when forms are valid
  exit() {
    this.navCtrl.setRoot(DashboardPage)
  }
  next() {
    this.slides.slideNext(500);
  }
  back() {
    this.slides.slidePrev(500);
  }
  //shouldLockSwipeToNext variable can be either true/false depending on condition
  lockNextSlide() {
    this.slides.lockSwipeToNext(this.shouldLockSwipeToNext);
  }
  lockPrevSlide() {
    this.slides.lockSwipeToPrev(this.LockSwipeToPrev)
  }
  //the logic that determines if slide should be lockSwiped 
  slideChanged() {
    let index = this.slides.realIndex;
    if ((index == 6 && !this.firstForm.valid) || (index == 7 && !this.secondForm.valid) || (index == 8) || (index == 9)) {
      this.disableSwipe()
    } else {
      this.eneableSwipe()
    }
    if (index == 6 || index == 9) {
      this.LockSwipeToPrev = true
      this.lockPrevSlide()
    } else {
      this.LockSwipeToPrev = false;
      this.lockPrevSlide()
    }
    this.lockNextSlide();
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
  unemployedOptions = this.customizeSelectOptions("Employement Status", "Select one");
  maritalOptions = this.customizeSelectOptions("Marital Status", "Select one");
  insigniaOptions = this.customizeSelectOptions("Officer Rank Insignia", "Select one")
  enlistedPayOptions = this.customizeSelectOptions("Enlisted Pay Rank", "Select one")

  onSubmit() {
    let userData: object = {
      branch: this.firstForm.value.branch,
      veteranOrActive: this.firstForm.value.vetOrActive,
      separationDate: this.firstForm.value.separationDate,
      disabilityStatus: this.firstForm.value.disability,
      disabilityPercent: this.firstForm.value.percentQuestion,
      employmentStatus: this.secondForm.value.employment,
      lastEmployed: this.secondForm.value.lastEmployed,
      maritalStatus: this.secondForm.value.marital,
      militaryRank: this.thirdForm.value.rank,
      insignia: this.thirdForm.value.insignia,
      enlistedPay: this.thirdForm.value.enlistedPay,
      MOS: this.thirdForm.value.MOS
    }
    console.log(userData, this.LockSwipeToPrev)
    this.user.updateUserModel(userData, window.sessionStorage.getItem('userId'))
      .subscribe(
        (data) => {
          console.log(data, "YEY!!!!!!")
        })
    this.shouldLockSwipeToNext = false;
    this.lockNextSlide()
    this.next();
  }

  setDashboardPage() {
    this.navCtrl.setRoot(DashboardPage)
  }

  setAssestmentPage() {
    this.navCtrl.setRoot(TransitionPage)
  }

}

