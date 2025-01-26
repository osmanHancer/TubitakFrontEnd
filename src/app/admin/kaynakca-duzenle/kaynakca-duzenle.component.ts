import { Component } from '@angular/core';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule } from '@angular/forms';
import { MySharedModules } from '../../_com/myshared.module';
import { QW } from '../../_lib/qw.helper';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {  NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
@Component({
  selector: 'app-kaynakca-duzenle',
  standalone: true,
  imports: [MySharedModules, CommonModule,
     NgSelectModule,AngularEditorModule,FormsModule],
  templateUrl: './kaynakca-duzenle.component.html',
  styleUrl: './kaynakca-duzenle.component.scss'
})
export class KaynakcaDuzenleComponent {

  constructor(private route: ActivatedRoute,private router: Router) {
  
  
  }
editItemList: html = {Seyahatnameler: '',Konaklama_ve_Seyahat_Kulturu:'',Mimari_Sanat_ve_Tarih: '',Diger: ''};  


public items: string[] = [];
LokasyonSource: any;
ImgSource: any;
lokasyon: any


async ngOnInit() {

  const json = await QW.json("/kaynakca");
  this.editItemList = json.data[0]; 

}


htmlContent = '';
opt1: any;

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
  fd.append('Seyahatnameler', this.editItemList.Seyahatnameler);
  fd.append('Konaklama_ve_Seyahat_Kulturu', this.editItemList.Konaklama_ve_Seyahat_Kulturu);
  fd.append('Mimari_Sanat_ve_Tarih', this.editItemList.Mimari_Sanat_ve_Tarih);
  fd.append('Diger', this.editItemList.Diger);
  fd.append('id', "1");
 await QW.jsonPost("/kaynakca", fd);

}




}

type html = {

Seyahatnameler: string

Konaklama_ve_Seyahat_Kulturu:string

Mimari_Sanat_ve_Tarih: string

Diger: string




}


