import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CrudService } from '../../services/crud.service';

interface Count {
  count: number;
}

@Component({
  selector: 'app-counter-app',
  standalone: true,
  imports: [],
  templateUrl: './counter-app.component.html',
  styleUrl: './counter-app.component.scss'
})
export class CounterAppComponent implements OnInit {

  counterObjList: Count[] = []
  counter$ = new BehaviorSubject(0);

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {

  }

  /*...... Add Row .......*/
  addRow(): void {
    this.counterObjList.push(
      {
        count: 0,
      }
    );
    this.crudService.setCounter(this.counterObjList.length);
  }

  /*...... Increment & Decrement .......*/
  counterValue(calType: string, item: Count): void {
    if (calType === 'increment') {
      item.count++;
    } else if (calType === 'decrement') {
      item.count--;
    }
  }

  /*...... Delete Row .......*/
  deleteRow(index: number): void {
    this.counterObjList.splice(index, 1);
    this.crudService.setCounter(this.counterObjList.length);
  }

  /*...... Reset All .......*/
  reset(): void {
    this.counterObjList = [];
    this.crudService.setCounter(this.counterObjList.length);
  }

}
