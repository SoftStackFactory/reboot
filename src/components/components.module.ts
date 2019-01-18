import { NgModule } from '@angular/core';
import { TimelineComponent } from './timeline/timeline';
import { NewsWidgetComponent } from './news-widget/news-widget';
import { ProgressBarComponent } from './progress-bar/progress-bar';
@NgModule({
	declarations: [TimelineComponent,
    NewsWidgetComponent,
    ProgressBarComponent],
	imports: [],
	exports: [TimelineComponent,
    NewsWidgetComponent,
    ProgressBarComponent]
})
export class ComponentsModule {}
