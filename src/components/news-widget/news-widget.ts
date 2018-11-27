import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RssProvider } from '../../providers/rss/rss';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'news-widget',
  templateUrl: 'news-widget.html'
})
export class NewsWidgetComponent {

  rssArray: any = [];


  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public rss: RssProvider, 
    private browser: InAppBrowser) {
      this.getData();
  }


  getData() {
    this.rss.getRSS().subscribe(
      data => {
        this.rssArray = data.items;
        console.log('array', this.rssArray)
        console.log(data,"kk");

      })
  }
}











