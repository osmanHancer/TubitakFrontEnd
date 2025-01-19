import { Component } from '@angular/core';
import { MySharedModules } from '../../../_com/myshared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { QW } from '../../../_lib/qw.helper';

@Component({
  selector: 'app-arazicalismasi-edit',
  standalone: true,
  imports: [MySharedModules],
  templateUrl: './arazicalismasi-edit.component.html',
  styleUrl: './arazicalismasi-edit.component.scss'
})
export class ArazicalismasiEditComponent {

  gizle: any;
  async submitForm(arg0: string) {
    const fd = new URLSearchParams();
    if (arg0 == "update") {

      fd.append('Envanter_Kodu', this.editItem.Envanter_Kodu.toString());
      fd.append('Yapi_Adi', this.editItem.Yapi_Adi.toString());
      fd.append('Guzergah', this.editItem.Guzergah);
      fd.append('Alternatif_Adi', this.editItem.Alternatif_Adi);
      fd.append('Donemi', this.editItem.Donemi);
      fd.append('Kitabesi', this.editItem.Kitabesi.toString());
      fd.append('Banisi', this.editItem.Banisi.toString());
      fd.append('Seyahatnamelerdeki_Anlatimi', this.editItem.Seyahatnamelerdeki_Anlatimi);
      fd.append('Durumu', this.editItem.Durumu);
      fd.append('enlem', this.editItem.enlem.toString());
      fd.append('boylam', this.editItem.boylam.toString());
      fd.append('Bugunki_Kullanimi', this.editItem.Bugunki_Kullanimi);
      fd.append('Mimari_Ozellikler', this.editItem.Mimari_Ozellikler);
      fd.append('Yasama_Ve_Eski_Kullanima_Dair_Izler', this.editItem.Yasama_Ve_Eski_Kullanima_Dair_Izler);
      fd.append('yapi_monografisi_var_yok', this.editItem.yapi_monografisi_var_yok);
      fd.append('notlar', this.editItem.Literatur_Ve_Arsiv_Kaynaklarindan_Notlar);
      fd.append('Kaynakca', this.editItem.Kaynakca);
      fd.append('Arazi_Calismasi_Ekibi', this.editItem.Arazi_Calismasi_Ekibi);
      fd.append('Arazi_Calismasi_Tarihi', this.editItem.Arazi_Calismasi_Tarihi);
      await QW.jsonPost("/arazicalismasi", fd);

    }
    if (arg0 == "delete") {

      // await QW.jsonPost("/noktalar/delete/"+this.editItem.id.toString()+"/"+ this.editItem.seyahname_kodu,fd);
    }
    await this.router.navigate(['/admin/arazicalismasi-list']);

  }
  editItem: edititem = {
    Envanter_Kodu: '', Yapi_Adi: '', Guzergah: '', Alternatif_Adi: '', Donemi: '', Kitabesi: '', Banisi: '', Seyahatnamelerdeki_Anlatimi: '', Durumu: '',
    enlem: 0.00000000, boylam: 0.000000000, Bugunki_Kullanimi: '', Mimari_Ozellikler: '', Yasama_Ve_Eski_Kullanima_Dair_Izler: '', yapi_monografisi_var_yok: '',
     Literatur_Ve_Arsiv_Kaynaklarindan_Notlar: '', Kaynakca: '', Arazi_Calismasi_Ekibi: '', Arazi_Calismasi_Tarihi: '',
  };
  constructor(private route: ActivatedRoute, private router: Router) {


  }

  async ngOnInit() {
    const EnvanterKodu = this.route.snapshot.paramMap.get('EnvanterKodu')
    if (EnvanterKodu != '-1') {
      this.gizle = false;
      let nokta = await QW.json("/arazicalismasi/" + EnvanterKodu);
      this.editItem=nokta;
      console.log(nokta);
    }
    else {
      this.gizle = true;
    }


  }


}
type edititem = {


  Envanter_Kodu: string;


  Yapi_Adi: string;


  enlem: number;


  boylam: number;


  Guzergah: string;


  Alternatif_Adi: string;


  Donemi: string;


  Kitabesi: string;


  Banisi: string;


  Seyahatnamelerdeki_Anlatimi: string;


  Durumu: string;


  Bugunki_Kullanimi: string;


  Mimari_Ozellikler: string;


  Yasama_Ve_Eski_Kullanima_Dair_Izler: string;


  yapi_monografisi_var_yok: string;


  Literatur_Ve_Arsiv_Kaynaklarindan_Notlar: string;


  Kaynakca: string;


  Arazi_Calismasi_Tarihi: string;


  Arazi_Calismasi_Ekibi: string;


}
