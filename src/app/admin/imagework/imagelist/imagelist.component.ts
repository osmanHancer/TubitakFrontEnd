import { Component, ViewChild } from '@angular/core';
import { MySharedModules } from '../../../_com/myshared.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { QW } from '../../../_lib/qw.helper';

@Component({
  selector: 'app-imagelist',
  standalone: true,
  imports: [MySharedModules],
  templateUrl: './imagelist.component.html',
  styleUrl: './imagelist.component.scss'
})
export class ImagelistComponent {
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
