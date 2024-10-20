import { trigger, transition, style, animate } from "@angular/animations";

export interface INavbarData {
    icon: string;
    label: string;
}

export const fadeInOut = trigger('fadeInOut', [
    transition(':enter', [
      style({opacity: 0}),
      animate('350ms',
        style({opacity: 1})
      )
    ]),
    transition(':leave', [
      style({opacity: 1}),
      animate('350ms',
        style({opacity: 0})
      )
    ]),
  ])