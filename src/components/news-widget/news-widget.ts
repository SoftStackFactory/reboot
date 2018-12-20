import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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

/**
 * gets data from rss feed through the rss provider. for loop iterates through each element
 * returned from the provider and parses the information into different variables (summary,
 * publish date, link, and picture)
 */
  getData() {
    this.rss.getRSS()
      .subscribe((newsData: NewsData) => {
        this.rss.newsArray = newsData.items;
        console.log(newsData, "Data");
        console.log('News Array', this.rss.newsArray)

        for (var i = 0; i < this.rss.newsArray.length; i++) {
          var div = document.createElement('div');
          div.innerHTML = this.rss.newsArray[i].description;
          let text = div.getElementsByTagName('p')[0].innerHTML;
          let sumText = text.substring(0, text.indexOf('<'));
          let date = this.rss.newsArray[i].pubDate.substring(0,10)

          this.rss.newsArray[i].sumText = sumText;
          this.rss.newsArray[i].link = div.getElementsByTagName('a')[0].getAttribute("href");;
          this.rss.newsArray[i].date = date;
          //splits thumbnail link to get higher resolution picture
          let picText = this.rss.newsArray[i].thumbnail.split('_thumb');
          let picture = picText[0] + "_1000" + picText[1];
          this.rss.newsArray[i].picture = picture;      
        }  
      })
  }
}











