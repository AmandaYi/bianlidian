import { DirectivesModule } from './../../directives/directives.module';
import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarListPage } from './car-list';

@NgModule({
  declarations: [
    CarListPage,
  ],
  imports: [
    IonicPageModule.forChild(CarListPage),ComponentsModule,DirectivesModule
  ],
})
export class CarListPageModule {}
