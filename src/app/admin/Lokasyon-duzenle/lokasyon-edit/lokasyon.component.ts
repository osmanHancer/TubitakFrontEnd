import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MySharedModules } from '../../../_com/myshared.module';
import { QW } from '../../../_lib/qw.helper';
;
@Component({
  selector: 'app-lokasyon',
  standalone: true,
  imports: [MySharedModules],
  templateUrl: './lokasyon.component.html',
  styleUrl: './lokasyon.component.scss'
})
export class LokasyonComponent {

  Id: any;
  async submitForm(arg0: string) {
    if (arg0 == "update") {
      const fd = new URLSearchParams();
      fd.append('Enlem', this.editItem.Enlem);
      fd.append('Boylam', this.editItem.Boylam,);
      fd.append('Mekanin_Gunumuzdeki_Adi', this.editItem.Mekanin_Gunumuzdeki_Adi);
      fd.append('mekan_adi', this.editItem.mekan_adi);
      fd.append('Envanter_Kodu', this.editItem.Envanter_Kodu);
      fd.append('Olcek', this.editItem.Olcek);
      fd.append('Lokasyon_Adi', this.editItem.Lokasyon_Adi);
      if (this.Id != "-1") {
        fd.append('Id', this.Id);
        await QW.jsonPost("/lokasyon", fd);
      }
      else {
        await QW.jsonPost("/lokasyon", fd);
      }
    }
    else {
      await QW.jsonPost("/lokasyon/delete/" + this.Id);
    }
    await this.router.navigate(['/admin/lokasyon']);

  }
  editItem: edititem = {
    Id: NaN, Lokasyon_Adi: '',
    Enlem: '10.11', Boylam: '11.22', Mekanin_Gunumuzdeki_Adi: '', Olcek: '', mekan_adi: '', Envanter_Kodu: ''
  };

  constructor(private route: ActivatedRoute, private router: Router) {}
  async ngOnInit() {
    this.Id = this.route.snapshot.paramMap.get('gunumuzdeki_adi')
    if (this.Id != "-1") {
      let user_2 = await QW.json("/lokasyon/" + this.Id);
      this.editItem = user_2.lokasyon;
      console.log(this.editItem)
    }



  }

}


type edititem = {
  Id: number
  Enlem: string
  Boylam: string
  Mekanin_Gunumuzdeki_Adi: string
  Olcek: string
  mekan_adi: string
  Envanter_Kodu: string
  Lokasyon_Adi: string

}