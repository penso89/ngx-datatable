import { 
  Component, Input, Output, EventEmitter, HostListener 
} from '@angular/core';
import { RowMeta } from '../../types';

@Component({
  selector: 'datatable-row-wrapper',
  template: `
    <ng-content></ng-content>
    <div 
      *ngIf="row.expanded === 1"
      [style.height.px]="detailRowHeight" 
      class="datatable-row-detail">
      <ng-template
        *ngIf="rowDetail && rowDetail.template"
        [ngTemplateOutlet]="rowDetail.template"
        [ngOutletContext]="{ row: row.row, meta: row }">
      </ng-template>
    </div>
  `,
  host: {
    class: 'datatable-row-wrapper'
  }
})
export class DataTableRowWrapperComponent {

  @Input() rowDetail: any;
  @Input() detailRowHeight: any;
  @Input() row: RowMeta;
  
  @Output() rowContextmenu = new EventEmitter<{event: MouseEvent, row: any}>(false);

  @HostListener('contextmenu', ['$event'])
  onContextmenu($event: MouseEvent): void {
    this.rowContextmenu.emit({ event: $event, row: this.row.row });
  }
}
