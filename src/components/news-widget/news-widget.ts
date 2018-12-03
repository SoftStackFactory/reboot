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

  sumText: string = "";
  link: any = {};

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public rss: RssProvider,
    private browser: InAppBrowser) {
    this.getData();
  }


  getData() {
    this.rss.getRSS()
      .subscribe((newsData: NewsData) => {
        this.rss.newsArray = newsData.items;
        console.log('array', this.rss.newsArray)
        console.log(newsData, "kk");
        var input = this.rss.newsArray[0].description;

        var div = document.createElement('div');
        div.innerHTML = input;
        console.log("inner = ", div);

        var summary = div.getElementsByTagName('p')[0];
        let linkHTML = div.getElementsByTagName('a')[0];
        console.log("linkHTM", linkHTML)
        let pic = div.getElementsByTagName('img')[0];
        let picture = pic.getAttribute("src");
        this.link = linkHTML.getAttribute("href")
        document.getElementById('picture').setAttribute('src', picture);
        // document.getElementById('link').setAttribute('href', link);
        let text = summary.innerHTML;
        this.sumText = text.substring(0, text.indexOf('<'));
        console.log("text", text, pic, picture, this.sumText, this.link);

      })
  }
}











