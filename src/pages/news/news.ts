import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RssProvider } from '../../providers/rss/rss';
import { InAppBrowser } from '@ionic-native/in-app-browser';


/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
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

    for (var i = 0; i < this.rss.newsArray.length; i++ ) {
      var input = this.rss.newsArray[i].description;
      var div = document.createElement('div');
      div.innerHTML = input;
      var summary = div.getElementsByTagName('p')[0];
      var linkHTML = div.getElementsByTagName('a')[0];
      let pic = div.getElementsByTagName('img')[0];
      let picture = pic.getAttribute("src");
      let link = linkHTML.getAttribute("href")
      let text = summary.innerHTML;
      let sumText = text.substring(0, text.indexOf('<'));
      console.log("NEWSPAGETEXT", picture);
      this.rss.newsArray[i].sumText = sumText;
      this.rss.newsArray[i].link = link;
      this.rss.newsArray[i].picture = picture; 
    }    
  }

 
//function to open link in new page (not in use because current rss feed already has link in description)
  openLink(url) {
    const link = this.browser.create(url);
  }

}
