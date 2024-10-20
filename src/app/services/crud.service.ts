import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CONSTANTS } from '../common/constants';
import { Weather } from '../models/weather';

@Injectable({
    providedIn: 'root'
})
export class CrudService {

    private endURL: string = environment.endPointUrl;
    private counter$ = new BehaviorSubject<number>(0);
    private appKey: string = environment.APP_KEY;
    private weatherUrl = CONSTANTS.weatherUrl;
    private forecastUrl = CONSTANTS.forecastUrl;

    constructor(private http: HttpClient,
        public router: Router) { }

    isEmptyObject(obj: any) {
        return (obj && (Object.keys(obj).length === 0));
    }

    /*...... Get Counter Data ......*/
    getCounter() {
        return this.counter$.asObservable();
    }

    /*...... Set Counter Data ......*/
    setCounter(count: number) {
        this.counter$.next(count);
    }

    /*...... Get Weather Data API ......*/
    getWeatherDataByCity(city: string): Observable<Weather> {
        return this.http.get<Weather>(`${this.endURL}${this.weatherUrl}?q=${city}&appid=${this.appKey}`);
    }

    /*...... Get Forecast Weather Data API ......*/
    getWeatherForecastDataByCity(city: string): Observable<any> {
        return this.http.get<any>(`${this.endURL}${this.forecastUrl}?q=${city}&appid=${this.appKey}`);
    }

}
