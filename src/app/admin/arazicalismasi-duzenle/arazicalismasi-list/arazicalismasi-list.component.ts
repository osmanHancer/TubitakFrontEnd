import { Component, ViewChild } from '@angular/core';
import { MySharedModules } from '../../../_com/myshared.module';
import { MatTableDataSource } from '@angular/material/table';
import { QW } from '../../../_lib/qw.helper';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-arazicalismasi-list',
  standalone: true,
  imports: [MySharedModules],
  templateUrl: './arazicalismasi-list.component.html',
  styleUrl: './arazicalismasi-list.component.scss'
})
export class ArazicalismasiListComponent {
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  str: any;
  jsondata:any;
  ngAfterViewInit() {
  
  
    }
  async ngOnInit() {
      
    const json =  await QW.json("/arazicalismasi");
    this.dataSource.data=json
    this.dataSource.paginator = this.paginator;
  }
  valuechange(searchValue: any): void {
    this.dataSource.filter=searchValue;
  }
}
