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
import { TimelinePage } from '../pages/timeline/timeline';
import { TimelineComponent } from '../components/timeline/timeline';
import { TimelineItemComponent } from '../components/timeline/timeline';
import { TimelineTimeComponent } from '../components/timeline/timeline';
import { ChartComponent } from '../components/chart/chart';
import { ChartProvider } from '../providers/chart/chart';
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
    TimelinePage,
    TimelineComponent,
    TimelineItemComponent,
    TimelineTimeComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
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
    TimelinePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    ChartProvider
  ]
})
export class AppModule {}
