import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QW } from '../../_lib/qw.helper';
import { CommonModule } from '@angular/common';
import { elementAt } from 'rxjs';
import { MySharedModules } from '../../_com/myshared.module';


@Component({
  selector: 'app-kutuphane',
  standalone: true,
  imports: [CommonModule, MySharedModules],
  templateUrl: './kutuphane.component.html',
  styleUrl: './kutuphane.component.scss'
})
export class KutuphaneComponent {
  editItemListYapi: any;
  editItemListSeyyah: any;
  yapisize: any;
  seyyahsize: any;
  filteredYapi: any
  filteredSeyahat: any
  binding: any;
  filtertextYapi = "";
  filtertextSeyahat = "";

  constructor(private route: ActivatedRoute) {

  }

  async ngOnInit() {
    const jsonSeyehatYapıları = await QW.json("/yapimonografisi/");
    this.editItemListYapi = jsonSeyehatYapıları.data;
    this.filteredYapi = this.editItemListYapi;
    this.yapisize = this.filteredYapi.length
    const jsonSeyyahlarveSeyahatnameleri = await QW.json("/makale");

    this.editItemListSeyyah = jsonSeyyahlarveSeyahatnameleri.makale;

    this.filteredSeyahat = this.editItemListSeyyah
    this.seyyahsize = this.filteredSeyahat.length


  }

  filterYapi(filtertext: any) {

    this.filteredYapi = this.editItemListYapi.filter((item: any) => item.yapi_html_1.toLowerCase().includes(filtertext.toLowerCase())||
    item.yapi_html_2.toLowerCase().includes(filtertext.toLowerCase())||
    item.yapi_html_3.toLowerCase().includes(filtertext.toLowerCase())||
    item.yapi_html_4.toLowerCase().includes(filtertext.toLowerCase())||
    item.yapi_html_5.toLowerCase().includes(filtertext.toLowerCase())||
    item.yapi_html_6.toLowerCase().includes(filtertext.toLowerCase())
  );

    this.yapisize = this.filteredYapi.length

  }

  filterSeyahat(filtertext: any) {

    this.filteredSeyahat = this.editItemListSeyyah.filter((item: any) => item.seyahatnameadi.toLowerCase().includes(filtertext.toLowerCase()) ||
      item.metin.toLowerCase().includes(filtertext.toLowerCase()));
    this.seyyahsize = this.filteredSeyahat.length

  }
}

