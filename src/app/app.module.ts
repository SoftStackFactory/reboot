import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { WizardPage } from '../pages/wizard/wizard';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { ProfilePage } from '../pages/profile/profile';
import { TransitionPage } from '../pages/transition/transition';
import { AssessmentPage } from '../pages/assessment/assessment';
import { TimelinePage } from '../pages/timeline/timeline';
import { TimelineComponent } from '../components/timeline/timeline';
import { TimelineItemComponent } from '../components/timeline/timeline';
import { TimelineTimeComponent } from '../components/timeline/timeline';

import { ChartsModule } from 'ng2-charts';
import { UserProvider } from '../providers/user/user';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    WizardPage,
    DashboardPage,
    ProfilePage,
    TransitionPage,
    AssessmentPage,
    TimelinePage,
    TimelineComponent,
    TimelineItemComponent,
    TimelineTimeComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    WizardPage,
    DashboardPage,
    ProfilePage,
    TransitionPage,
    AssessmentPage,
    TimelinePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider
  ]
})
export class AppModule {}
