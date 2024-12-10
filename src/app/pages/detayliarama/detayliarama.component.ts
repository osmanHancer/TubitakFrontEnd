import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QW } from '../../_lib/qw.helper';
import { MySharedModules } from '../../_com/myshared.module';
import { CommonModule } from '@angular/common';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { ThemeService } from '../../_lib/theme.service';

@Component({
  selector: 'app-detayliarama',
  standalone: true,
  imports: [MySharedModules, CommonModule,
    NgSelectComponent, NgSelectModule],
  templateUrl: './detayliarama.component.html',
  styleUrl: './detayliarama.component.scss'
})
export class DetayliaramaComponent {

  editItemListYapi: any;
  editItemListSeyyahMakale: any;
  yapisize: any;
  seyyahsize: any;
  filteredYapi: any
  filteredMakale: any
  selectedSeyyah: any[] = [];
  selectedLokasyon: any[] = [];
  selectedyapi: any[] = [];
  selectedyuzyil: any[] = [];
  lokasyonlar: any;
  filterLokasyonlar: any;
  binding: any;
  seyyahlar: any
  filtertext_1 = "";
  filtertext_2 = "";
  state: any = "ve";
  mekanTipleri: string[] = ['KERVANSARAY / HAN', 'ÖZEL MÜLK', 'MİSAFİRHANE / OTEL / PANSİYON', 'AÇIK ALANDA KONAKLAMA', 'YERLEŞİM YERİ', 'TANIMLANMAYAN MEKAN', 'DİNİ YAPI', 'ASKERİ VE GÜVENLİĞE İLİŞKİNYAPILAR', 'DİĞER'];



  async ngOnInit() {
    let seyyah = await QW.json("/seyyahs");
    this.seyyahlar = seyyah.users;
    const json = await QW.json("/lokasyon");
    this.lokasyonlar = json.lokasyon;
    this.filterLokasyonlar = this.lokasyonlar.slice();
    const jsonSeyehatYapıları = await QW.json("/yapimonografisi/");
    this.editItemListYapi = jsonSeyehatYapıları.data;
    this.filteredYapi = this.editItemListYapi;
    this.yapisize = this.filteredYapi.length
    const jsonSeyyahlarveSeyahatnameleri = await QW.json("/makale");
    this.editItemListSeyyahMakale = jsonSeyyahlarveSeyahatnameleri.makale;
    this.filteredMakale = this.editItemListSeyyahMakale
    this.seyyahsize = this.filteredMakale.length
  }


  filter() {
    this.filterSeyahat();
    this.filterYapi();
  }
  filterSeyahat() {
    if (this.selectedSeyyah.length == 0 && this.selectedyuzyil.length == 0) {
      this.filteredMakale = this.editItemListSeyyahMakale
    }
    if (this.selectedSeyyah.length != 0 || this.selectedyuzyil.length != 0) {
      this.filteredMakale = this.editItemListSeyyahMakale.filter((item: any) =>
        this.selectedyuzyil.some((yuzyil: any) =>
          item.yuzyil.toLowerCase().includes(yuzyil.toLowerCase())
        ) ||
        this.selectedSeyyah.some((seyyah: string) =>
          item.seyyah.toLowerCase().includes(seyyah.toLowerCase())
        )
      );


    }

    if (this.filtertext_1.length > 0 || this.filtertext_2.length > 0) {
      if (this.state == "ve") {

        this.filteredMakale = this.editItemListSeyyahMakale.filter((item: any) => item.metin.toLowerCase().includes(this.filtertext_1.toLowerCase()) &&
          item.metin.toLowerCase().includes(this.filtertext_2.toLowerCase()));
        this.seyyahsize = this.filteredMakale.length

      }
      if (this.state == "veya") {

        this.filteredMakale = this.editItemListSeyyahMakale.filter((item: any) => item.metin.toLowerCase().includes(this.filtertext_1.toLowerCase()) ||
          item.metin.toLowerCase().includes(this.filtertext_2.toLowerCase()));
        this.seyyahsize = this.filteredMakale.length

      }
    }
    this.seyyahsize = this.filteredMakale.length

  }
  filterYapi() {
    if (this.selectedLokasyon.length == 0 && this.selectedyuzyil.length == 0 && this.selectedyapi.length == 0) {
      this.filteredYapi = this.editItemListYapi
    }
    else if (this.selectedLokasyon.length != 0 || this.selectedyuzyil.length != 0 || this.selectedyapi.length !=0) {
      this.filteredYapi = this.editItemListYapi.filter((yapi: any) =>
        this.selectedLokasyon.some((lokasyonId: any) => lokasyonId === yapi.lokasyonId) || this.selectedyuzyil.some((yuzyil: string) =>
          yapi.yuzyil.toLowerCase().includes(yuzyil.toLowerCase())) || this.selectedyapi.some((selectyapi: string) =>
            yapi.yapituru.toLowerCase().includes(selectyapi.toLowerCase()))
      );
    }

    if (this.filtertext_1.length > 0 || this.filtertext_2.length > 0) {
      if (this.state == "ve") {
        this.filteredYapi = this.editItemListYapi.filter((item: any) => {
          // İlk filtre için text_1 kontrolü
          const matchesFilterText1 =
            item.yapi_html_1.toLowerCase().includes(this.filtertext_1.toLowerCase()) ||
            item.yapi_html_2.toLowerCase().includes(this.filtertext_1.toLowerCase()) ||
            item.yapi_html_3.toLowerCase().includes(this.filtertext_1.toLowerCase()) ||
            item.yapi_html_4.toLowerCase().includes(this.filtertext_1.toLowerCase()) ||
            item.yapi_html_5.toLowerCase().includes(this.filtertext_1.toLowerCase()) ||
            item.yapi_html_6.toLowerCase().includes(this.filtertext_1.toLowerCase());

          // İkinci filtre için text_2 kontrolü
          const matchesFilterText2 =
            item.yapi_html_1.toLowerCase().includes(this.filtertext_2.toLowerCase()) ||
            item.yapi_html_2.toLowerCase().includes(this.filtertext_2.toLowerCase()) ||
            item.yapi_html_3.toLowerCase().includes(this.filtertext_2.toLowerCase()) ||
            item.yapi_html_4.toLowerCase().includes(this.filtertext_2.toLowerCase()) ||
            item.yapi_html_5.toLowerCase().includes(this.filtertext_2.toLowerCase()) ||
            item.yapi_html_6.toLowerCase().includes(this.filtertext_2.toLowerCase());

          // Her iki filtre koşulunu sağlayan öğeleri döndür
          return matchesFilterText1 && matchesFilterText2;
        });
      }

      if (this.state == "veya") {

        this.filteredYapi = this.editItemListYapi.filter((item: any) => item.yapi_html_1.toLowerCase().includes(this.filtertext_1.toLowerCase()) || item.yapi_html_1.toLowerCase().includes(this.filtertext_2.toLowerCase()) ||
          item.yapi_html_2.toLowerCase().includes(this.filtertext_1.toLowerCase()) || item.yapi_html_2.toLowerCase().includes(this.filtertext_2.toLowerCase()) ||
          item.yapi_html_3.toLowerCase().includes(this.filtertext_1.toLowerCase()) || item.yapi_html_3.toLowerCase().includes(this.filtertext_2.toLowerCase()) ||
          item.yapi_html_4.toLowerCase().includes(this.filtertext_1.toLowerCase()) || item.yapi_html_4.toLowerCase().includes(this.filtertext_2.toLowerCase()) ||
          item.yapi_html_5.toLowerCase().includes(this.filtertext_1.toLowerCase()) || item.yapi_html_5.toLowerCase().includes(this.filtertext_2.toLowerCase()) ||
          item.yapi_html_6.toLowerCase().includes(this.filtertext_1.toLowerCase()) || item.yapi_html_6.toLowerCase().includes(this.filtertext_2.toLowerCase())
        );

      }
    }

    this.yapisize = this.filteredYapi.length
  }

  clear() {
    this.filteredMakale = this.editItemListSeyyahMakale
    this.seyyahsize = this.filteredMakale.length
    this.selectedSeyyah = [];
    this.selectedyuzyil = [];
    this.filteredYapi = this.editItemListYapi
    this.yapisize = this.filteredYapi.length
    this.selectedLokasyon = [];
    this.selectedyapi = [];
    this.filtertext_1 = "";
    this.filtertext_2 = "";
  }

}
