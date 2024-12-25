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
  LokasyonSource: any;
  dataSource = new MatTableDataSource();
  jsondata: any;
  columns: any;
  str: any;
  async ngOnInit() {

    const json = await QW.json("/galeri");
    this.dataSource.data = json.galeri;
    const jsonlokasyon = await QW.json("/lokasyon");
    this.LokasyonSource = jsonlokasyon.lokasyon;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  valuechange(searchValue: any): void {
    this.dataSource.filter = searchValue;
  }
  async update(imagename: string, metin: string, envanterNo: any) {
    const fd = new URLSearchParams();
    fd.append('imgname', imagename);
    fd.append('metin', metin);
    fd.append('envanterNo', envanterNo);

    await QW.jsonPost("/galeri", fd);
  }
  async delete(arg0: any) {
    await QW.jsonPost("/galeri/delete/" + arg0);
    const json = await QW.json("/galeri");
    this.dataSource.data = json.galeri;
  }
}
