import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileModalPage } from './profile-modal';

@NgModule({
  declarations: [
    ProfileModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileModalPage),
  ],
})
export class ProfileModalPageModule {}
