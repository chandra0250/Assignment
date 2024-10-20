import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CrudService } from '../../services/crud.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss'
})
export class PageHeaderComponent implements OnInit, OnDestroy {
  
  count: number = 0;
  private subscription: Subscription | undefined;

   constructor(private router: Router, private crudService: CrudService){}
   
   ngOnInit(): void {
     this.subscription = this.crudService.getCounter().subscribe((res: number) => {
         this.count = res;
     })
   }

   isActive(route: string): boolean {
    if (this.router.url === '/weather-app'){
      this.crudService.setCounter(0);
    }
    return this.router.url === route;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
