import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './table/header/header.component';
import { OverflowComponent } from './table/overflow/overflow.component';
import { CellComponent } from './table/row/cell/cell.component';
import { RowComponent } from './table/row/row.component';
import { TableComponent } from './table/table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TableComponent,
    OverflowComponent,
    HeaderComponent,
    RowComponent,
    CellComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  width: string = '200px';

  changeWidth(): void {
    this.width = this.width === '200px' ? '400px' : '200px';
  }
}
