import { AfterContentInit, Component, ContentChildren, ElementRef, OnDestroy, QueryList } from '@angular/core';
import { Subscription } from 'rxjs';
import { HeaderComponent } from './header/header.component';
import { OverflowComponent } from './overflow/overflow.component';
import { RowComponent } from './row/row.component';
import { TableService } from './table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  standalone: true,
  providers: [
    TableService
  ],
  imports: [
    OverflowComponent,
    HeaderComponent,
    RowComponent
  ],
  styles: `
  :host { display: block; }
  table { width: 100%; }`
})
export class TableComponent implements AfterContentInit, OnDestroy {
    private observers: Array<MutationObserver> = [];
    private onHeaderChanges!: Subscription;
    private onCheckOverflowTimeout: any;

    @ContentChildren(HeaderComponent) headerComponents!: QueryList<HeaderComponent>;

    constructor(
        private service: TableService,
        private elementRef: ElementRef
    ) {}

    ngAfterContentInit(): void {
        this.onObserverHeaders();
        this.onHeaderChanges = this.headerComponents.changes.subscribe(this.onObserverHeaders.bind(this));
    }

    ngOnDestroy(): void {
        this.onHeaderChanges.unsubscribe();
    }

    private onObserverHeaders(): void {
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];

        this.headerComponents.forEach(header =>{
            const observer = new MutationObserver(mutations => {
                for (const mutation of mutations) {
                    if (mutation.attributeName === 'width') {
                        this.onCheckOverFlow();
                        break;
                    }
                }
            });

            observer.observe(header.elementRef.nativeElement, {
                attributes: true
            });
        });
    }

    private onCheckOverFlow(): void {
        if (this.onCheckOverflowTimeout) {
            clearTimeout(this.onCheckOverflowTimeout);
        }
        this.onCheckOverflowTimeout = setTimeout(() => {
            let totalWidth: number = 0;
            this.headerComponents.forEach((header: HeaderComponent) => {
                totalWidth += this.getHeaderWidth(header);
            });

            this.service.tablePages = Math.ceil(totalWidth / this.elementRef.nativeElement.clientWidth); 
        }, 10);
    }

    private getHeaderWidth(header: HeaderComponent): number {
        if (header.elementRef.nativeElement.width.includes('%')) {
            // Do percentage
            return 0;
        } else {
            return Number(header.elementRef.nativeElement.width.replace('px', ''));
        }
    }
}
