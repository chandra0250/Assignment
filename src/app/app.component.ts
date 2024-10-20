import { Component } from '@angular/core';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { BodyComponent } from './layout/body/body.component';
import { HeaderComponent } from './layout/header/header.component';
import { PageHeaderComponent } from './layout/page-header/page-header.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

interface  SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BodyComponent,HeaderComponent,SidebarComponent,PageHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'assignment';
  isSideNavCollapsed: boolean = false;
  screenWidth:number = 0;
  url: string = '';
  
  constructor(private router: Router, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.url = this.router.url;
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.url = this.router.url.split('?')[0];
      });
  }

  onToggleSideNav(data: SideNavToggle):void{
     this.screenWidth = data.screenWidth;
     this.isSideNavCollapsed = data.collapsed;  
  }
}
