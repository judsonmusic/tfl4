import { NgModule } from '@angular/core';

import { HearPipe, OccupationPipe, EducationPipe, EthnicitiesPipe } from './utils.pipe';
@NgModule({
  declarations: [HearPipe, EducationPipe, OccupationPipe, EthnicitiesPipe],
  exports: [HearPipe, EducationPipe, OccupationPipe, EthnicitiesPipe]
})
export class AllPipesModule { }