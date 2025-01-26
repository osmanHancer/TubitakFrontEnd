import { Component } from '@angular/core';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule } from '@angular/forms';
import { MySharedModules } from '../../_com/myshared.module';
import { QW } from '../../_lib/qw.helper';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {  NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
@Component({
  selector: 'app-ciktilar-duzenle',
  standalone: true,
  imports: [MySharedModules, CommonModule,
    NgSelectModule,AngularEditorModule,FormsModule],
  templateUrl: './ciktilar-duzenle.component.html',
  styleUrl: './ciktilar-duzenle.component.scss'
})
export class CiktilarDuzenleComponent {

  constructor(private route: ActivatedRoute,private router: Router) {
  
  
  }
editItemList: html = {ciktilar:'' };  


ciktilar: any


async ngOnInit() {

  const json = await QW.json("/ciktilar");
  this.editItemList = json.data[0]; 

}



config: AngularEditorConfig = {
  editable: true,
  spellcheck: false,
  height: '25rem',
  sanitize: false,
  minHeight: '5rem',
  placeholder: 'Enter text here...',
  translate: 'no',
  defaultParagraphSeparator: 'p',
  defaultFontName: 'Arial',
  toolbarHiddenButtons: [
    ['bold']
  ],
  customClasses: [],


};



async Save() {

  
console.log(this.editItemList)
  const fd = new URLSearchParams();
  fd.append('ciktilar', this.editItemList.ciktilar);
  fd.append('id', "1");
 await QW.jsonPost("/ciktilar", fd);

}




}

type html = {

ciktilar: string


}


