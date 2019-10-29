import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MenuRoutes } from './menu.routing';
import { HomeComponent } from '../home/home.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(MenuRoutes),
        FormsModule,
        HttpClientModule
    ],
    declarations: [
        HomeComponent
    ]
})

export class MenuModule { }