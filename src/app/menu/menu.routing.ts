import { Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';

export const MenuRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    {
        path: '', redirectTo: '/home', pathMatch: 'full',
    }
];
