import { Component } from '@angular/core';
import { MySharedModules } from '../../_com/myshared.module';
import { QW } from '../../_lib/qw.helper';
import { CountUpDirective } from './count-up.directive';
import { ChartModule } from 'primeng/chart';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MySharedModules, CountUpDirective, ChartModule],

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  seyyahsayisi: any = 0;
  noktasayisi: any = 0;
  seyahatnamesayisi: any = 0;
  makalesayisi: any = 0;
  galerisayisi: any = 0;
  lokasyonsayisi: any = 0;
  labels: any = [];
  data: any = [];
  labelsSeyyah: any = [];
  dataSeyyah: any = [];
  duration = 2000;
  top10noktasayisi: any;
  top10seyyahsayisi: any;
  async ngOnInit() {
    const jsonnoktalar = await QW.json("/noktalar");
    this.noktasayisi = jsonnoktalar.users.length.toString();
    const jsonseyyahlar = await QW.json("/seyyahs");
    this.seyyahsayisi = jsonseyyahlar.users.length;
    const jsonseyahatname = await QW.json("/seyahatname");
    this.seyahatnamesayisi = jsonseyahatname.users.length;
    const jsonmakale = await QW.json("/makale");
    this.makalesayisi = jsonmakale.makale.length;
    const jsongaleri = await QW.json("/galeri");
    this.galerisayisi = jsongaleri.galeri.length;
    const jsonlokasyon = await QW.json("/lokasyon");
    this.lokasyonsayisi = jsonlokasyon.lokasyon.length;

  }
  basicData: any;
  basicDataSeyyah: any;

  async ngAfterContentInit() {
    const jsontop10nokta = await QW.json("/noktalar/top-locations");
    this.top10noktasayisi = jsontop10nokta
    const jsontop10seyyah = await QW.json("/noktalar/top-seyyah");
    this.top10seyyahsayisi = jsontop10seyyah
    this.top10noktasayisi.forEach((element: any) => {
      this.labels.push(element.mekanin_gunumuzdeki_adi);
      this.data.push(element.kullanim_sayisi);
    });
    this.top10seyyahsayisi.forEach((element: any) => {
      this.labelsSeyyah.push(element.yazar);
      this.dataSeyyah.push(element.kullanim_sayisi);
    });

    this.basicData = {
      labels: this.labels,
      datasets: [
        {
          label: 'Şehirlerin Ziyaret Edilme Sayısı',
          backgroundColor: '#42A5F5',
          data: this.data,
        },
      ],
    };
    this.basicDataSeyyah = {
      labels: this.labelsSeyyah,
      datasets: [
        {
          label: 'Seyyahların Ziyaret Ettiği Nokta Sayısı',
          backgroundColor: '#ff6a6a',
          data: this.dataSeyyah,
        },
      ],
    };
  
  }
}
