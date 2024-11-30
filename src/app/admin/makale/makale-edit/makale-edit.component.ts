import { Component } from '@angular/core';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { MySharedModules } from '../../../_com/myshared.module';
import { QW } from '../../../_lib/qw.helper';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-makale-edit',
  standalone: true,
  imports: [AngularEditorModule, MySharedModules],
  templateUrl: './makale-edit.component.html',
  styleUrl: './makale-edit.component.scss'
})
export class MakaleEditComponent {


  Delete() {

    QW.json("/makale/delete/" + this.seyahatnameKodu);
  }
  seyahatnameKodu: any
  seyyahlar: any
  editItem: tematik = { seyahatnameadi: "", kodu: "", yuzyil: "", metin: "", seyyah: "" };

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  async ngOnInit() {
    this.seyahatnameKodu = this.route.snapshot.paramMap.get('id')
    if (this.seyahatnameKodu != '-1') {
      let data = await QW.json("/makale/" + this.seyahatnameKodu);
     
      this.editItem = data.makale

    }
    let seyyah = await QW.json("/seyyahs");
    this.seyyahlar = seyyah.users;
  }

  async Save() {
    const fd = new URLSearchParams();
    fd.append('kodu', this.editItem.kodu);
    fd.append('metin', this.editItem.metin);
    fd.append('seyahatnameadi', this.editItem.seyahatnameadi);
    fd.append('seyyah', this.editItem.seyyah);
    fd.append('yuzyil', this.editItem.yuzyil);



    await QW.jsonPost("/makale", fd);

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
        class: "tema-1 makale-tema-text makale-tema-01",
      },
      {
        name: 'Deneyim-Aktivite / Olay örgüsü/Çatışmalar/Riskler',
        class: 'tema-2 makale-tema-text makale-tema-02',

      },
      {
        name: "Seyahat Kültürü",
        class: "tema-3 makale-tema-text makale-tema-03",

      },
      {
        name: "Seyahatnamelerin aktörleri",
        class: "tema-4 makale-tema-text makale-tema-04",

      },
      {
        name: "Diğer seyyahlar",
        class: " tema-4 makale-tema-text makale-tema-05",

      },

    ],


  };






}

interface tematik {

  seyahatnameadi: string;
  kodu: string
  yuzyil: string
  metin: string
  seyyah: string

}