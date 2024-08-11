import { Component } from '@angular/core';
import { MySharedModules } from '../../_com/myshared.module';
import { MatTableDataSource } from '@angular/material/table';
import { QW } from '../../_lib/qw.helper';

@Component({
  selector: 'app-yapilar',
  standalone: true,
  imports: [MySharedModules],
  templateUrl: './yapilar.component.html',
  styleUrl: './yapilar.component.scss'
})
export class YapilarComponent {
  dataSource = new MatTableDataSource();
str: any;
jsondata:any;

async ngOnInit() {
    
  const json =  await QW.json("/yapilar");
  this.dataSource.data=json.users
}
valuechange(searchValue: any): void {
  this.dataSource.filter=searchValue;
}
}
