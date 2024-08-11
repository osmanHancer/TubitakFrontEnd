import { Component } from '@angular/core';
import { MySharedModules } from '../../../_com/myshared.module';
import { MatTableDataSource } from '@angular/material/table';
import { QW } from '../../../_lib/qw.helper';
@Component({
  selector: 'app-adimlar',
  standalone: true,
  imports: [MySharedModules],
  templateUrl: './adimlar.component.html',
  styleUrl: './adimlar.component.scss'
})
export class AdimlarComponent {

  dataSource = new MatTableDataSource();
  str :any;
  async ngOnInit() {
    const json =  await QW.json("/saha-adimlari");
    this.dataSource.data=json.data;
  }
  valuechange(searchValue: any): void {
    this.dataSource.filter=searchValue;
  }
}
