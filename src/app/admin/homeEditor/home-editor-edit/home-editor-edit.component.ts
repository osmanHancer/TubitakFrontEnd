import { Component } from '@angular/core';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule } from '@angular/forms';
import { MySharedModules } from '../../../_com/myshared.module';
import { QW } from '../../../_lib/qw.helper';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home-editor-edit',
  standalone: true,
  imports: [MySharedModules, CommonModule,AngularEditorModule,FormsModule],
  templateUrl: './home-editor-edit.component.html',
  styleUrl: './home-editor-edit.component.scss'
})
export class HomeEditorEditComponent {
  constructor(private route: ActivatedRoute) {


  }
  yapi_ismi:any
  editItemList: html = {
    hakkinda: '',
    sahacalismalari: '',
    projeciktilari: '',
    amaclar: '',


  };


  public items: string[] = [];
  LokasyonSource: any;
  ImgSource: any;
  lokasyon: any


  async ngOnInit() {

  
    const jsoneditorhtml=await QW.json("/editor");
    this.editItemList.amaclar=jsoneditorhtml.editor[0].amaclar
    this.editItemList.hakkinda=jsoneditorhtml.editor[0].hakkinda
    this.editItemList.sahacalismalari=jsoneditorhtml.editor[0].sahacalismalari
    this.editItemList.projeciktilari=jsoneditorhtml.editor[0].projeciktilari
  }


  htmlContent = '';
  opt1: any;

  confighakkinda: AngularEditorConfig = {
    editable: true,
    spellcheck: false,
    height: '25rem',
    sanitize: false,
    minHeight: '5rem',
    placeholder: 'Hakkında',
    translate: 'no',
    customClasses: [],
  };
  configsahacalismalari: AngularEditorConfig = {
    editable: true,
    spellcheck: false,
    height: '25rem',
    sanitize: false,
    minHeight: '5rem',
    placeholder: 'Saha Çalışmaları',
    translate: 'no',
    customClasses: [],
  };
  configprojecitilari: AngularEditorConfig = {
    editable: true,
    spellcheck: false,
    height: '25rem',
    sanitize: false,
    minHeight: '5rem',
    placeholder: 'Proje Çıktıları',
    translate: 'no',
    customClasses: [],
  };

  configamaclar: AngularEditorConfig = {
    editable: true,
    spellcheck: false,
    height: '25rem',
    sanitize: false,
    minHeight: '5rem',
    placeholder: 'Amaçlar',
    translate: 'no',
    customClasses: [],
  };



  async Save() {


    const fd = new URLSearchParams();

    fd.append('hakkinda', this.editItemList.hakkinda);
    fd.append('amaclar', this.editItemList.amaclar);
    fd.append('sahacalismalari', this.editItemList.sahacalismalari);
    fd.append('projeciktilari', this.editItemList.projeciktilari);

    fd.append('Id', "1");
   await QW.jsonPost("/editor", fd);
  }



}

type html = {


  
  hakkinda: string;

  amaclar: string;

  sahacalismalari: string;

  projeciktilari: string;
 


}



