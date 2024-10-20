import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CounterAppComponent } from './pages/counter-app/counter-app.component';
import { WeatherAppComponent } from './pages/weather-app/weather-app.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'counter-app',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'counter-app',
        component: CounterAppComponent
    },
    {
        path: 'weather-app',
        component: WeatherAppComponent
    }
];
