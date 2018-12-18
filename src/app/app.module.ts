import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
//import { SelfAssessmentPage } from '../pages/self-assessment/self-assessment';
import { HistoryPage } from '../pages/history/history';
//import { ResourcesPage } from '../pages/resources/resources';
import { TimelineComponent } from '../components/timeline/timeline';
import { TimelineItemComponent } from '../components/timeline/timeline';
import { TimelineTimeComponent } from '../components/timeline/timeline';
import { ChartComponent } from '../components/chart/chart';
import { ChartProvider } from '../providers/chart/chart';
import { UserProvider } from '../providers/user/user';
import { IonicStorageModule } from '@ionic/storage';
//import { NewsPage } from '../pages/news/news';
import { RssProvider } from '../providers/rss/rss';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { NewsWidgetComponent } from '../components/news-widget/news-widget';
<<<<<<< HEAD
import { Network } from "@ionic-native/network";
import { NetworkProvider } from '../providers/network/network'
import { OfflineInterceptor } from './http-interceptors/offlineInterceptor';
=======
>>>>>>> offline
import { StorageProvider } from '../providers/storage/storage';


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
   // SelfAssessmentPage,
    HistoryPage,
   // NewsPage,
    TimelineComponent,
    TimelineItemComponent,
    TimelineTimeComponent,
    ChartComponent,
    NewsWidgetComponent,
    //ResourcesPage,
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
   // NewsPage,
    //SelfAssessmentPage,
    //ResourcesPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    { provide: HTTP_INTERCEPTORS, useClass: OfflineInterceptor, multi: true },
    UserProvider,
    ChartProvider,
    RssProvider,
    InAppBrowser,
    Network,
    NetworkProvider,
    StorageProvider
  ]
})
export class AppModule {}