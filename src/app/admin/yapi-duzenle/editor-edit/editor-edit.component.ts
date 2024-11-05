import { Component } from '@angular/core';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule } from '@angular/forms';
import { MySharedModules } from '../../../_com/myshared.module';
import { QW } from '../../../_lib/qw.helper';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectComponent, NgSelectConfig, NgSelectModule } from '@ng-select/ng-select';
@Component({
  selector: 'app-editor-edit',
  standalone: true,
  imports: [MySharedModules, CommonModule, NgLabelTemplateDirective,
    NgOptionTemplateDirective,
    NgSelectComponent, NgSelectModule,AngularEditorModule,FormsModule],
  templateUrl: './editor-edit.component.html',
  styleUrl: './editor-edit.component.scss'
})
export class EditorEditComponent {

  constructor(private route: ActivatedRoute) {


  }
  yapi_ismi:any
  editItemList: html = {
    yuzyil: '', yapi_ismi: '',yapituru:'', baslik: '', alt_baslik: '', enlem: '', boylam: '', yapi_html_1: '', lokasyonId: 1,
    yapi_html_2: '',
    yapi_html_3: '',
    yapi_html_4: '',
    yapi_html_5: '',
    yapi_html_6: ''
  };


  public items: string[] = [];
  LokasyonSource: any;
  ImgSource: any;
  lokasyon: any


  async ngOnInit() {
    const json = await QW.json("/lokasyon");
    this.LokasyonSource = json.lokasyon;
    this.yapi_ismi = this.route.snapshot.paramMap.get('id')
    if(this.yapi_ismi != "-1"){
    const yapi = await QW.json("/yapimonografisi/"+this.yapi_ismi);
    this.editItemList=yapi.data
    }
  


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
    customClasses: [
      {
        name: "Konaklama bilgisi / mimari mekansal birimler",
        class: "makale-tema-text makale-tema-01",
      },
      {
        name: 'Deneyim-Aktivite / Olay örgüsü/Çatışmalar/Riskler',
        class: 'makale-tema-text makale-tema-02',

      },
      {
        name: "Seyahat Kültürü",
        class: "makale-tema-text makale-tema-03",

      },
      {
        name: "Seyahatnamelerin aktörleri",
        class: "makale-tema-text makale-tema-04",

      },
      {
        name: "Diğer seyyahlar",
        class: "makale-tema-text makale-tema-05",

      },

    ],


  };



  async Save() {

    const json = await QW.json("/lokasyon/"+this.editItemList.lokasyonId);
    this.editItemList.enlem=json.lokasyon.Enlem
    this.editItemList.boylam=json.lokasyon.Boylam

    const fd = new URLSearchParams();
    fd.append('yapi_ismi', this.editItemList.yapi_ismi);
    fd.append('yapituru', this.editItemList.yapituru);
    fd.append('baslik', this.editItemList.baslik);
    fd.append('alt_baslik', this.editItemList.alt_baslik);
    fd.append('enlem', this.editItemList.enlem);
    fd.append('boylam', this.editItemList.boylam);
    fd.append('yapi_html_1', this.editItemList.yapi_html_1);
    fd.append('yapi_html_2', this.editItemList.yapi_html_2);
    fd.append('yapi_html_3', this.editItemList.yapi_html_3);
    fd.append('yapi_html_4', this.editItemList.yapi_html_4);
    fd.append('yapi_html_5', this.editItemList.yapi_html_5);
    fd.append('yapi_html_6', this.editItemList.yapi_html_6);
    fd.append('lokasyonId', this.editItemList.lokasyonId.toString());
    fd.append('yuzyil', this.editItemList.yuzyil);
   await QW.jsonPost("/yapimonografisi", fd);
  }



}

type html = {

  yapi_ismi: string

  yapituru:string

  baslik: string

  alt_baslik: string

  enlem: string

  boylam: string
  
  yapi_html_1: string
 
  yapi_html_2: string
 
  yapi_html_3: string
  
  yapi_html_4: string

  yapi_html_5: string
 
  yapi_html_6: string
 
  yuzyil:string

  lokasyonId:number


}


