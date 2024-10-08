import { Component, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MySharedModules } from '../../../_com/myshared.module';
import { QW } from '../../../_lib/qw.helper';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-lokasyon-edit',
  standalone: true,
  imports: [MySharedModules],
  templateUrl: './lokasyon-edit.component.html',
  styleUrl: './lokasyon-edit.component.scss'
})
export class LokasyonEditComponent {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  dataSource = new MatTableDataSource();
  jsondata:any;
  columns: any;
  str :any;
  async ngOnInit() {
    const json =  await QW.json("/lokasyon");
    this.dataSource.data=json.lokasyon;
    console.log(this.dataSource.data);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    }

  valuechange(searchValue: any): void {
    this.dataSource.filter=searchValue;
  }

}
