import { Component, ViewEncapsulation } from '@angular/core';
import { QW } from '../../_lib/qw.helper';
import { CommonModule, ViewportScroller } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LightgalleryModule } from 'lightgallery/angular';
import { NgImageSliderModule } from 'ng-image-slider';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MySharedModules } from '../../_com/myshared.module';


@Component({
  selector: 'app-yapi',
  standalone: true,
  imports: [CommonModule, LightgalleryModule, NgbPaginationModule, NgbAlertModule, NgImageSliderModule,MySharedModules],
  templateUrl: './yapi.component.html',
  styleUrl: './yapi.component.scss',

})
export class YapiComponent {
  
  constructor(private router: Router, private viewportScroller: ViewportScroller,private route: ActivatedRoute,private sanitizer: DomSanitizer) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.viewportScroller.scrollToPosition([0, 0]); // Sayfanın en üstüne kaydır
      }
    });
  }
  images: img[] = [];
  enlem:any;
  boylam:any
  galeriImgs: any
  yapi_html_1: SafeHtml | undefined
  yapi_html_2: SafeHtml | undefined
  yapi_html_3: SafeHtml | undefined
  yapi_html_4: SafeHtml | undefined
  yapi_html_5: SafeHtml | undefined
  yapi_html_6: SafeHtml | undefined
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
        image:'https://yolmekan.agu.edu.tr/api/file/' + element.imgname,
        thumbImage:'https://yolmekan.agu.edu.tr/api/file/' + element.imgname,
        title: element.metin
      };

      this.images.push(newImage);


    });
    this.yapi_html_1 = this.sanitizer.bypassSecurityTrustHtml(this.editItemList.yapi_html_1);
    this.yapi_html_2 = this.sanitizer.bypassSecurityTrustHtml(this.editItemList.yapi_html_2);
    this.yapi_html_3 = this.sanitizer.bypassSecurityTrustHtml(this.editItemList.yapi_html_3);
    this.yapi_html_4 = this.sanitizer.bypassSecurityTrustHtml(this.editItemList.yapi_html_4);
    this.yapi_html_5 = this.sanitizer.bypassSecurityTrustHtml(this.editItemList.yapi_html_5);
    this.yapi_html_6 = this.sanitizer.bypassSecurityTrustHtml(this.editItemList.yapi_html_6);
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


