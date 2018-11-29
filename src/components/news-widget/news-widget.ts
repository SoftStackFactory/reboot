import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RssProvider } from '../../providers/rss/rss';
import { InAppBrowser } from '@ionic-native/in-app-browser';
interface NewsData {
  items: Array<any>
}

@Component({
  selector: 'news-widget',
  templateUrl: 'news-widget.html'
})
export class NewsWidgetComponent {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public rss: RssProvider, 
    private browser: InAppBrowser) {
      this.getData();
  }


  getData() {
    this.rss.getRSS()
    .subscribe( (newsData:NewsData) => {
        this.rss.newsArray = newsData.items;
        console.log('array', this.rss.newsArray)
        console.log(newsData,"kk");
      })
  }
}











