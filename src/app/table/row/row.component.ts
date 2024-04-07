import { Component } from '@angular/core';
import { CellComponent } from './cell/cell.component';

@Component({
  selector: 'tr[app-table-row]',
  templateUrl: './row.component.html',
  standalone: true,
  imports: [
    CellComponent
  ]
})
export class RowComponent {
}
