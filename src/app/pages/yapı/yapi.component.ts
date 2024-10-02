import { Component } from '@angular/core';
import { QW } from '../../_lib/qw.helper';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LightgalleryModule } from 'lightgallery/angular';
import { NgImageSliderModule } from 'ng-image-slider';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-yapi',
  standalone: true,
  imports: [CommonModule, LightgalleryModule, NgbPaginationModule, NgbAlertModule, NgImageSliderModule],
  templateUrl: './yapi.component.html',
  styleUrl: './yapi.component.scss'
})
export class YapiComponent {
  constructor(private route: ActivatedRoute) {


  }
  images: img[] = [];
  enlem:any;
  boylam:any
  galeriImgs: any
  editItemList: html = {
    yapi_ismi: '', baslik: '', alt_baslik: '', enlem: '', boylam: '', yapi_html_1: '',
    yapi_html_2: '',
    yapi_html_3: '',
    yapi_html_4: '',
    yapi_html_5: '',
    yapi_html_6: '',
    yuzyil: '',
    lokasyonId: ''
  };


  async ngOnInit() {
    let yapı = this.route.snapshot.paramMap.get('yapı')
    const json = await QW.json("/yapimonografisi/" + yapı);
    this.editItemList = json.data;
    let lokasyon = await QW.json('/lokasyon/' + this.editItemList.lokasyonId);
    this.enlem = lokasyon.lokasyon.Enlem
    this.boylam = lokasyon.lokasyon.Boylam
    this.galeriImgs = await QW.json('/galeri/filter/' + this.editItemList.lokasyonId);

    this.galeriImgs.images.forEach((element: any) => {

      const newImage: img = {
        image: 'http://localhost:3000/file/' + element.imgname,
        thumbImage: 'http://localhost:3000/file/' + element.imgname,
        title: element.metin
      };

      this.images.push(newImage);


    });

    console.log(this.images)
  }
}
interface html {

  yapi_ismi: string

  baslik: string

  alt_baslik: string

  enlem: string

  boylam: string

  yapi_html_1: string

  yapi_html_2: string

  yapi_html_3: string

  yapi_html_4: string

  yapi_html_5: string

  yapi_html_6: string

  yuzyil: string

  lokasyonId: string


}
interface img {

  image: string

  thumbImage: string

  title: string



}


