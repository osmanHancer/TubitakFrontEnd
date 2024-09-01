import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QW } from '../../_lib/qw.helper';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-kutuphane',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kutuphane.component.html',
  styleUrl: './kutuphane.component.scss'
})
export class KutuphaneComponent {
  editItemListYapi: any;
  editItemListSeyyah: any;
  yapisize:any;
  seyyahsize:any;

  constructor(private route: ActivatedRoute) {

  }

  async ngOnInit() {
    let yapı= this.route.snapshot.paramMap.get('yapı') 
    const jsonSeyehatYapıları = await QW.json("/yapimonografisi/");
    this.editItemListYapi=jsonSeyehatYapıları.data;
    this.yapisize=this.editItemListYapi.length
    const jsonSeyyahlarveSeyahatnameleri =  await QW.json("/makale");
    this.editItemListSeyyah=jsonSeyyahlarveSeyahatnameleri.makale;
    this.seyyahsize=this.editItemListSeyyah.length



  }

  filter(){
    
    console.log("osman");
  }
}

