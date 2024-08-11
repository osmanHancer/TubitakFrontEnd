import { Component } from '@angular/core';
import { QW } from '../../_lib/qw.helper';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private route: ActivatedRoute) {


  }
  editItemList: html = { yapi_ismi:'',baslik:'',alt_baslik:'',enlem:'',boylam:'',yapi_html_1: '', img_1: '', yapi_html_2: '', img_2: '', yapi_html_3: '', img_3: '', yapi_html_4: '', img_4: '', yapi_html_5: '', img_5: '', yapi_html_6: '', img_6: '' ,yuzyil:''};

  async ngOnInit() {
    let yapı= this.route.snapshot.paramMap.get('yapı') 
    const json = await QW.json("/yapimonografisi/"+yapı);
    this.editItemList=json.data;
    console.log(this.editItemList)


  }
}
interface html {

  yapi_ismi: string
  baslik: string
  alt_baslik: string
  enlem: string
  boylam: string
  yapi_html_1: string
  img_1: string
  yapi_html_2: string
  img_2: string
  yapi_html_3: string
  img_3: string
  yapi_html_4: string
  img_4: string
  yapi_html_5: string
  img_5: string
  yapi_html_6: string
  img_6: string
  yuzyil:string


}


