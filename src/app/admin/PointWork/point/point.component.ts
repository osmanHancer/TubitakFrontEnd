import { Component, ViewChild } from '@angular/core';
import { MySharedModules } from '../../../_com/myshared.module';
import { MatTableDataSource } from '@angular/material/table';
import { QW } from '../../../_lib/qw.helper';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-point',
  standalone: true,
  imports: [MySharedModules],
  templateUrl: './point.component.html',
  styleUrl: './point.component.scss'
})
export class PointComponent {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource();
  jsondata:any;
  columns: any;
  str :any;
  ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;

  }
  async ngOnInit() {
    
    const json =  await QW.json("/noktalar");
   this.dataSource.data=json.users
  }

  valuechange(searchValue: any): void {
    this.dataSource.filter=searchValue;
  }

}
