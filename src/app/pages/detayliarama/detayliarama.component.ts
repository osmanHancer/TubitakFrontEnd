import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QW } from '../../_lib/qw.helper';
import { MySharedModules } from '../../_com/myshared.module';
import { FormControl } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectComponent, NgSelectConfig, NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-detayliarama',
  standalone: true,
  imports: [MySharedModules, CommonModule, NgLabelTemplateDirective,
    NgOptionTemplateDirective,
    NgSelectComponent, NgSelectModule],
  templateUrl: './detayliarama.component.html',
  styleUrl: './detayliarama.component.scss'
})
export class DetayliaramaComponent {
  onOptionSelected(arg0: any) {
    console.log("girdi");
    console.log(arg0);
    this.selectedLokasyon = arg0;
  }
  editItemListYapi: any;
  editItemListSeyyahMakale: any;
  yapisize: any;
  seyyahsize: any;
  filteredYapi: any
  filteredSeyahat: any
  selectedSeyyah: any;
  selectedLokasyon: any[] = [];
  selectedyapi: any[] = [];
  selectedyuzyil: any[] = [];
  lokasyonlar: any;
  filterLokasyonlar: any;
  binding: any;
  seyyahlar: any
  filtertext_1 = "";
  filtertext_2 = "";
  state :any;
  mekanTipleri: string[] = ['Han', 'Kervansaray', 'Seçenek 3'];
  selectedMekanTipleri: string[] = [];
  constructor(private route: ActivatedRoute) {


  }

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

    this.filteredSeyahat = this.editItemListSeyyahMakale
    this.seyyahsize = this.filteredSeyahat.length
  }


  printt() {
    this.filterSeyahat();
    this.filterYapi();
  }
  filterSeyahat() {
    if (this.selectedSeyyah != null && this.selectedyuzyil != null) {
      this.filteredSeyahat = this.editItemListSeyyahMakale.filter((item: any) =>
        this.selectedyuzyil.some((yuzyil: any) =>
          item.yuzyil.toLowerCase().includes(yuzyil.toLowerCase())
        ) || item.seyyah.toLowerCase().includes(this.selectedSeyyah.toLowerCase())
      );

    }

    if (this.state == "ve") {

      this.filteredSeyahat = this.editItemListSeyyahMakale.filter((item: any) => item.metin.toLowerCase().includes(this.filtertext_1.toLowerCase()) &&
      item.metin.toLowerCase().includes(this.filtertext_2.toLowerCase()));
    this.seyyahsize = this.filteredSeyahat.length

    }
    if (this.state == "veya") {

      this.filteredSeyahat = this.editItemListSeyyahMakale.filter((item: any) => item.metin.toLowerCase().includes(this.filtertext_1.toLowerCase()) ||
      item.metin.toLowerCase().includes(this.filtertext_2.toLowerCase()));
    this.seyyahsize = this.filteredSeyahat.length

    }
    this.seyyahsize = this.filteredSeyahat.length

  }
  filterYapi() {

    if (this.selectedLokasyon != null && this.selectedyuzyil != null) {
      this.filteredYapi = this.editItemListYapi.filter((yapi: any) =>
        this.selectedLokasyon.some((lokasyonId: any) => lokasyonId === yapi.lokasyonId) && this.selectedyuzyil.some((yuzyil: string) =>
          yapi.yuzyil.toLowerCase().includes(yuzyil.toLowerCase()))
      );

    }

    if (this.state == "ve") {
      this.filteredYapi = this.editItemListYapi.filter((item: any) => item.yapi_html_1.toLowerCase().includes(this.filtertext_1.toLowerCase()) ||
        item.yapi_html_2.toLowerCase().includes(this.filtertext_1.toLowerCase()) ||
        item.yapi_html_3.toLowerCase().includes(this.filtertext_1.toLowerCase()) ||
        item.yapi_html_4.toLowerCase().includes(this.filtertext_1.toLowerCase()) ||
        item.yapi_html_5.toLowerCase().includes(this.filtertext_1.toLowerCase()) ||
        item.yapi_html_6.toLowerCase().includes(this.filtertext_1.toLowerCase())
      );
      this.filteredYapi = this.filteredYapi.filter((item: any) => item.yapi_html_1.toLowerCase().includes(this.filtertext_2.toLowerCase()) ||
        item.yapi_html_2.toLowerCase().includes(this.filtertext_2.toLowerCase()) ||
        item.yapi_html_3.toLowerCase().includes(this.filtertext_2.toLowerCase()) ||
        item.yapi_html_4.toLowerCase().includes(this.filtertext_2.toLowerCase()) ||
        item.yapi_html_5.toLowerCase().includes(this.filtertext_2.toLowerCase()) ||
        item.yapi_html_6.toLowerCase().includes(this.filtertext_2.toLowerCase())
      );

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

    this.yapisize = this.filteredYapi.length
  }

}
