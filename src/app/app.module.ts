import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http'

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
import { TimelineItemComponent } from '../components/timeline/timeline';
import { TimelineTimeComponent } from '../components/timeline/timeline';
import { ChartComponent } from '../components/chart/chart';
import { ChartProvider } from '../providers/chart/chart';
import { UserProvider } from '../providers/user/user';
import { IonicStorageModule } from '@ionic/storage';
import { NewsPage } from '../pages/news/news';
import { RssProvider } from '../providers/rss/rss';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { NewsWidgetComponent } from '../components/news-widget/news-widget';
import { TimelineComponent } from '../components/timeline/timeline';


const Pages = [
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
  NewsPage,
  ChartComponent,
  ResourcesPage,
  
]

@NgModule({
  declarations: [
    ...Pages,
    TimelineItemComponent,
    TimelineTimeComponent,
    NewsWidgetComponent,
    TimelineComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule
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
    NewsPage,
    SelfAssessmentPage,
    ResourcesPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    ChartProvider,
    RssProvider,
    InAppBrowser

  ]
})
export class AppModule {}