
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilitiesService } from './utilities.component';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
       UtilitiesService
    ],
    declarations: [
        UtilitiesService
    ]
})
export class UtilitiesModule { }
