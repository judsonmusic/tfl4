import { NgModule } from '@angular/core';

import { HearPipe, OccupationPipe, EducationPipe, EthnicitiesPipe, IncomePipe } from './utils.pipe';
@NgModule({
  declarations: [HearPipe, EducationPipe, OccupationPipe, EthnicitiesPipe, IncomePipe],
  exports: [HearPipe, EducationPipe, OccupationPipe, EthnicitiesPipe, IncomePipe]
})
export class AllPipesModule { }