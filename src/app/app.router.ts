import {Routes} from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {LandingComponent} from './landing/landing.component';

export const routes: Routes = [
    { path: 'landing', component: LandingComponent },
    { path: 'welcome', component: WelcomeComponent },
    { path: '', redirectTo: 'landing', pathMatch: 'full' }
];