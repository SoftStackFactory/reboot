import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelfAssessmentPage } from './self-assessment';

@NgModule({
  declarations: [
    SelfAssessmentPage,
  ],
  imports: [
    IonicPageModule.forChild(SelfAssessmentPage),
  ],
})
export class SelfAssessementPageModule {}
