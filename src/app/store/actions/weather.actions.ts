import { createAction, props } from '@ngrx/store';
import { Root } from '../../models/weather';

export const loadWeather = createAction('[Weather] Load Weather', props<{ weatherData: Root[] }>());
export const deleteWeather = createAction('[Weather] Delete Weather', props<{ index: number }>());
export const clearWeather = createAction('[Weather] Clear Weather Data');
