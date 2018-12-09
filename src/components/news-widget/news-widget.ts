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
      .subscribe((newsData: NewsData) => {
        this.rss.newsArray = newsData.items;
        console.log(newsData, "Data");
        console.log('News Array', this.rss.newsArray)

        for (var i = 0; i < this.rss.newsArray.length; i++) {
          var div = document.createElement('div');
          div.innerHTML = this.rss.newsArray[i].description;
          let picture = div.getElementsByTagName('img')[0].getAttribute("src");
          let text = div.getElementsByTagName('p')[0].innerHTML;
          let sumText = text.substring(0, text.indexOf('<'));
          let date = this.rss.newsArray[i].pubDate.substring(0,10)

          this.rss.newsArray[i].sumText = sumText;
          this.rss.newsArray[i].link = div.getElementsByTagName('a')[0].getAttribute("href");;
          this.rss.newsArray[i].date = date;
          let mockText = this.rss.newsArray[i].thumbnail;
          let newText = mockText.split('_thumb');
          let newPic = newText[0] + "_1000" + newText[1];
          console.log("YYEEYYYYTTTT", newPic);
          this.rss.newsArray[i].picture = newPic; 

          // https://www.va.gov/HEALTH/images/ivh-images/20180403_DeannaCallender_1000.jpg
          // http://www.va.gov/HEALTH/images/ivh-images/20180403_DeannaCallender.jpg        
        }  
      })
  }
}











