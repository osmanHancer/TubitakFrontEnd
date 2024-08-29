import { Component } from '@angular/core';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { MySharedModules } from '../../../_com/myshared.module';
import { QW } from '../../../_lib/qw.helper';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-makale-edit',
  standalone: true,
  imports: [AngularEditorModule, MySharedModules],
  templateUrl: './makale-edit.component.html',
  styleUrl: './makale-edit.component.scss'
})
export class MakaleEditComponent {


Delete() {

  QW.json("/makale/delete/"+this.seyahatnameKodu);
  console.log("girdi")
}
  seyahatnameKodu: any
  editItem: tematik = { seyahatnameadi: "", kodu: "", yuzyil: NaN, metin: "" };

  constructor(private route: ActivatedRoute) {
  }

  async ngOnInit() {
    this.seyahatnameKodu = this.route.snapshot.paramMap.get('id')
    if (this.seyahatnameKodu != '-1') {
      let data= await QW.json("/makale/"+this.seyahatnameKodu);
    this.editItem=data.makale

    }

  }

  Save() {
    const fd = new URLSearchParams();
    fd.append('kodu', this.editItem.kodu);
    fd.append('metin', this.editItem.metin);
    fd.append('seyahatnameadi', this.editItem.seyahatnameadi);
    fd.append('yuzyil', this.editItem.yuzyil.toString());

    QW.jsonPost("/makale", fd);
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
    customClasses: [
      {
        name: "Konaklama bilgisi / mimari mekansal birimler",
        class: "makale-tema-text makale-tema-01",
        tag:"span"
      },
      {
        name: 'Deneyim-Aktivite / Olay örgüsü/Çatışmalar/Riskler',
        class: 'makale-tema-text makale-tema-02',
        tag:"span"

      },
      {
        name: "Seyahat Kültürü",
        class: "makale-tema-text makale-tema-03",
        tag:"span"

      },
      {
        name: "Seyahatnamelerin aktörleri",
        class: "makale-tema-text makale-tema-04",
        tag:"span"

      },
      {
        name: "Diğer seyyahlar",
        class: "makale-tema-text makale-tema-05",
        tag:"span"

      },

    ],


  };






}

interface tematik {

  seyahatnameadi: string;
  kodu: string
  yuzyil: number
  metin: string

}