import { Component } from '@angular/core';
import { MySharedModules } from '../../../_com/myshared.module';
import { MatTableDataSource } from '@angular/material/table';
import { QW } from '../../../_lib/qw.helper';

@Component({
  selector: 'app-seyyah',
  standalone: true,
  imports: [MySharedModules],
  templateUrl: './seyyah.component.html',
  styleUrl: './seyyah.component.scss'
})
export class SeyyahComponent {
  dataSource = new MatTableDataSource();
  str :any;
  async ngOnInit() {
    const json =  await QW.json("/seyyahs");
    this.dataSource.data=json.users;
  }
  valuechange(searchValue: any): void {
    this.dataSource.filter=searchValue;
  }
}
