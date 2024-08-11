import { Component } from '@angular/core';
import { MySharedModules } from '../../../_com/myshared.module';
import { MatTableDataSource } from '@angular/material/table';
import { QW } from '../../../_lib/qw.helper';

@Component({
  selector: 'app-seyehatname',
  standalone: true,
  imports: [MySharedModules],
  templateUrl: './seyehatname.component.html',
  styleUrl: './seyehatname.component.scss'
})
export class SeyehatnameComponent {

  dataSource = new MatTableDataSource();
  str :any;
  async ngOnInit() {
    const json =  await QW.json("/seyahatname");
    this.dataSource.data=json.users;
    console.log(json.users);
  }
  valuechange(searchValue: any): void {
    this.dataSource.filter=searchValue;
  }
}
