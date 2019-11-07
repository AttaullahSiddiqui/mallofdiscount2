import { Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { PrivacyComponent } from '../privacy/privacy.component';
import { TermsComponent } from '../terms/terms.component';
import { CategoriesComponent } from '../categories/categories.component';
import { StoresComponent } from '../stores/stores.component';
import { BlogsComponent } from '../blogs/blogs.component';
import { CategoryComponent } from '../category/category.component';
import { StoreComponent } from '../store/store.component';

export const MenuRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'privacy', component: PrivacyComponent },
    { path: 'termsandconditions', component: TermsComponent },
    { path: 'categories', component: CategoriesComponent },
    { path: 'stores', component: StoresComponent },
    { path: 'blogs', component: BlogsComponent },
    { path: 'category', component: CategoryComponent },
    { path: 'store', component: StoreComponent },
    {
        path: '', redirectTo: '/home', pathMatch: 'full',
    }
];
