import { Component } from '@angular/core';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule } from '@angular/forms';
import { MySharedModules } from '../../../_com/myshared.module';
import { QW } from '../../../_lib/qw.helper';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-makale',
  standalone: true,
  imports: [AngularEditorModule, FormsModule, MySharedModules],
  templateUrl: './makale.component.html',
  styleUrl: './makale.component.scss'
})
export class MakaleComponent {
  
  dataSource = new MatTableDataSource();
  str :any;
  async ngOnInit() {
    const json =  await QW.json("/makale");
    this.dataSource.data=json.makale;
  }
  valuechange(searchValue: any): void {
    this.dataSource.filter=searchValue;
  }
}
