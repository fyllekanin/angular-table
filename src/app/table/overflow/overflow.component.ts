
import { Component } from '@angular/core';
import { TableService } from '../table.service';

@Component({
  selector: 'table-overflow',
  templateUrl: './overflow.component.html',
  standalone: true
})
export class OverflowComponent {

    constructor(protected service: TableService) {}
}
