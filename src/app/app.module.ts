import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

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
import { SelfAssessmentPage } from '../pages/self-assessment/self-assessment';
import { HistoryPage } from '../pages/history/history';
import { ResourcesPage } from '../pages/resources/resources';
import { TimelineComponent } from '../components/timeline/timeline';
import { TimelineItemComponent } from '../components/timeline/timeline';
import { TimelineTimeComponent } from '../components/timeline/timeline';
import { ChartComponent } from '../components/chart/chart';
import { ChartProvider } from '../providers/chart/chart';
import { UserProvider } from '../providers/user/user';
import { IonicStorageModule } from '@ionic/storage';
import { TimelineProvider } from '../providers/timeline/timeline';


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
    SelfAssessmentPage,
    HistoryPage,
    TimelineComponent,
    TimelineItemComponent,
    TimelineTimeComponent,
    ChartComponent,
    ResourcesPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
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
    TimelinePage,
    HistoryPage,
    SelfAssessmentPage,
    ResourcesPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    ChartProvider,
    TimelineProvider
  ]
})
export class AppModule {}