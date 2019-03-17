import { NgModule } from '@angular/core';
import { MeterCompComponent } from './meterComp/meterComp';
import { WarningMeterComponent } from './warning-meter/warning-meter';
@NgModule({
	declarations: [MeterCompComponent,
    WarningMeterComponent],
	imports: [],
	exports: [MeterCompComponent,
    WarningMeterComponent]
})
export class ComponentsModule {}
