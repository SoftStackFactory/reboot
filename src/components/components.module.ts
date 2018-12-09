import { NgModule } from '@angular/core';
import { TimelineComponent } from './timeline/timeline';
import { NewsWidgetComponent } from './news-widget/news-widget';
@NgModule({
	declarations: [TimelineComponent,
    NewsWidgetComponent],
	imports: [],
	exports: [TimelineComponent,
    NewsWidgetComponent]
})
export class ComponentsModule {}
