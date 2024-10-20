import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { HeaderComponent } from '../../layout/header/header.component';
import { CONSTANTS } from '../../common/constants';

interface User{
  name: string,
  img: string
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent,HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  users: User[] = CONSTANTS.users; 

  constructor(){}

  ngOnInit(): void {
    
  }

}
