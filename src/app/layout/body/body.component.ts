import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { filter } from 'rxjs';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [RouterOutlet,CommonModule,NgxSpinnerModule],
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss'
})
export class BodyComponent implements OnInit {

  @Input() collapsed:boolean = false;
  @Input() screenWidth:number = 0;
  url: string = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.url = this.router.url;
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.url = this.router.url.split('?')[0];
      });
  }

  getBodyClass(): string {
    let styleClass = '';
    if (this.url != '/dashboard') {
      styleClass = 'body';
    }
    return styleClass;
  }
}
