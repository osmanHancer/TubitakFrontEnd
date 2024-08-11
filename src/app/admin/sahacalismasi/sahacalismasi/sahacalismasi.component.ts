import { Component } from '@angular/core';
import { MySharedModules } from '../../../_com/myshared.module';
import { MatTableDataSource } from '@angular/material/table';
import { QW } from '../../../_lib/qw.helper';
@Component({
  selector: 'app-sahacalismasi',
  standalone: true,
  imports: [MySharedModules],
  templateUrl: './sahacalismasi.component.html',
  styleUrl: './sahacalismasi.component.scss'
})
export class SahacalismasiComponent {
  dataSource = new MatTableDataSource();
  str :any;
  async ngOnInit() {
    const json =  await QW.json("/sahacalismasi");
    this.dataSource.data=json;
  }
  valuechange(searchValue: any): void {
    this.dataSource.filter=searchValue;
  }
}
