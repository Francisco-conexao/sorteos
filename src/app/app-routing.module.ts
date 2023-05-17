import { NgModule } from '@angular/core';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from "./layout/layout.component";

import { LoginGuard } from "./guards/login.guard";
import { HomeGuard } from "./guards/home.guard";
import { DashboardGuard } from "./guards/dashboard.guard";
import { SorteoComponent } from './sorteo/sorteo.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'sorteo',
        pathMatch: 'full'
    },{
        path: 'sorteo',
        loadChildren: () => import('./sorteo/sorteo.module').then(m => m.SorteoModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
