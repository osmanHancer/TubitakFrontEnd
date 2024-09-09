import { Component } from '@angular/core';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule } from '@angular/forms';
import { MySharedModules } from '../../../_com/myshared.module';
import { QW } from '../../../_lib/qw.helper';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-editor-edit',
  standalone: true,
  imports: [AngularEditorModule, FormsModule, MySharedModules],
  templateUrl: './editor-edit.component.html',
  styleUrl: './editor-edit.component.scss'
})
export class EditorEditComponent {

  constructor(private route: ActivatedRoute) {


  }
  yapi_ismi:any
  editItemList: html = {
    yuzyil: '', yapi_ismi: '', baslik: '', alt_baslik: '', enlem: '', boylam: '', yapi_html_1: '', lokasyonId: '',
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
    this.yapi_ismi = this.route.snapshot.paramMap.get('id')
    if(this.yapi_ismi != "-1"){
    const yapi = await QW.json("/yapimonografisi/"+this.yapi_ismi);
    this.editItemList=yapi.data
    }
    const json = await QW.json("/lokasyon");
    this.LokasyonSource = json.lokasyon;


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



  Save() {
    const fd = new URLSearchParams();
    fd.append('yapi_ismi', this.editItemList.yapi_ismi);
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
    fd.append('lokasyonId', this.editItemList.lokasyonId);
    fd.append('yuzyil', this.editItemList.yuzyil);
    QW.jsonPost("/yapimonografisi", fd);
    console.log(this.editItemList)
  }



}

interface html {

  yapi_ismi: string

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

  lokasyonId:string


}


