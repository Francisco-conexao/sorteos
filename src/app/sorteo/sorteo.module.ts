import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SorteoRoutingModule } from "./sorteo-routing.module";
import { SorteoComponent } from "./sorteo.component";



@NgModule({
    declarations: [SorteoComponent],
    imports: [
        FormsModule,
        CommonModule,
        SorteoRoutingModule
    ]
})
export class SorteoModule {}
