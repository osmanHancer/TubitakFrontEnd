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
  filtertextYapi = "";
  filtertextSeyahat = "";
  mekanTipleri: string[] = ['Han', 'Kervansaray', 'Seçenek 3'];
  selectedMekanTipleri: string[] = [];
  constructor(private route: ActivatedRoute) {


  }
  @ViewChild('input') input: any;

  filterLokasyon(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();
    this.filterLokasyonlar = this.lokasyonlar.filter((o: any) => o.mekan_adi.toLowerCase().includes(filterValue));
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

    this.filteredSeyahat = this.editItemListSeyyahMakale.filter((item: any) =>
      this.selectedyuzyil.some((yuzyil: string) =>
        item.yuzyil.toLowerCase().includes(yuzyil.toLowerCase())
      ) && item.seyyah.toLowerCase().includes(this.selectedSeyyah.toLowerCase())
    );

    this.seyyahsize = this.filteredSeyahat.length

  }
  filterYapi() {


    this.filteredYapi = this.editItemListYapi.filter((yapi: any) =>
      this.selectedLokasyon.some((lokasyonId: any) => lokasyonId === yapi.lokasyonId)&& this.selectedyuzyil.some((yuzyil: string) =>
        yapi.yuzyil.toLowerCase().includes(yuzyil.toLowerCase()))
    );
    
    
    
      
    
      
    

    this.yapisize = this.filteredYapi.length

  }

}
