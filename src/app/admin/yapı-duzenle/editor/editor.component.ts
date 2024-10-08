import { Component } from '@angular/core';
import { MySharedModules } from '../../../_com/myshared.module';
import { MatTableDataSource } from '@angular/material/table';
import { QW } from '../../../_lib/qw.helper';
@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [MySharedModules],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent {


  dataSource = new MatTableDataSource();
  str :any;
  async ngOnInit() {
    const json =  await QW.json("/yapimonografisi");
    this.dataSource.data=json.data;
    console.log(json.data)
  }
  valuechange(searchValue: any): void {
    this.dataSource.filter=searchValue;
  }
}
