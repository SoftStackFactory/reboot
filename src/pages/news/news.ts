import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RssProvider } from '../../providers/rss/rss';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public rss: RssProvider, 
    private browser: InAppBrowser) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
    console.log('news array', this.rss.newsArray)  
  }

 
  openLink(url) {
    const link = this.browser.create(url);
  }

}
