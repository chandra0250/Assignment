import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../services/crud.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { clearWeather, deleteWeather, loadWeather } from '../../store/actions/weather.actions';
import { CommonModule } from '@angular/common';
import { CONSTANTS } from '../../common/constants';
import { Root } from '../../models/weather';

@Component({
  selector: 'app-weather-app',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './weather-app.component.html',
  styleUrl: './weather-app.component.scss'
})
export class WeatherAppComponent implements OnInit {

  cityForm = new FormGroup({
    city: new FormControl()
  });
  weatherData: Root[] = [];
  weatherData$: Observable<Root> | any;
  cityData: any = {};
  forecastData: any[] = [];
  weatherIconsList = CONSTANTS.weatherIcons;
  isShow: boolean = false;

  constructor(private crudService: CrudService, private store: Store<{ weather: any }>){}

  ngOnInit(): void {
    this.getWeatherData();
  }

  /*........ Get Weather Data From Store ........*/
  getWeatherData(): void{
    this.weatherData$ = this.store.select((state) => state.weather.weatherData);
  }

  /*........ Get Weather Data By Entered City ........*/
  getDataByCity(): void{
     this.getData(this.cityForm.get('city')?.value);
  }

  /*........ Get Weather Data API Integration ........*/
  getData(city: string): void {
    this.crudService.getWeatherDataByCity(city).subscribe((res: any) => {
        const current = new Date();
        res.dt = current.getTime();

        this.weatherData$.pipe(take(1)).subscribe((existingData: Root[]) => {
          const existingCityIndex = existingData.findIndex(x => x.name === res.name);
          if (existingCityIndex > -1){
            existingData.filter(x => (x.name === res.name))[0].weather = res.weather; 
            existingData[existingCityIndex] = res;
          }else{
            if (existingData.length >= 8){
                const oldestIndex = existingData.length - 1;
                existingData.splice(oldestIndex, 1);
            }
            const updatedWeatherData = [...existingData, res].sort((a, b) => b.dt - a.dt);
            this.store.dispatch(loadWeather({ weatherData: updatedWeatherData }));
          }
        });
        this.cityForm.reset();
      });
  }

  /*........ Refresh Weather Data By City ........*/
  refreshWeatherData(item: Root): void{
    this.getData(item.name);
    if (this.isShow)
        this.getCityData(item);
  }

  /*........ Delete a City from Store ........*/
  deleteLocation(item: Root, index: number): void{
    if (this.cityData.name === item.name){
       this.cityData = {};
       this.forecastData = [];
       this.isShow = false;
    }
    this.store.dispatch(deleteWeather({ index }));
  }

  /*........ Clear all data in store ........*/
  clearWeatherData(): void {
    this.isShow = false;
    this.cityData = {};
    this.store.dispatch(clearWeather());
  }

  /*........ Get Forecast Weather data from API ........*/
  getCityData(item: Root): void{
    this.isShow = true;
    this.cityData = item;
    this.forecastData = [];
    this.crudService.getWeatherForecastDataByCity(item.name).subscribe((res: any) => {
        res.list.map((x: any) => {
          if (x.dt_txt.split(' ')[1] === '06:00:00'){
            this.forecastData.push(x);
          }
        })
    }) 
  }

  /*........ Object empty check ........*/
  emptyObj(obj: any): any{
    return this.crudService.isEmptyObject(obj);
  }

  /*........ Date Formating ........*/
  dateFormat(dt: string): string{
    var d = new Date(dt);
    return CONSTANTS.days[d.getDay()];
  }

  /*........ Get related weather icons ........*/
  getWeatherIcon(item: Root): string{
    return this.weatherIconsList.filter(x => (x.label === item.weather[0].main))[0].img;
  }

}
