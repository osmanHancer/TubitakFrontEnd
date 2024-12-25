import { Component, inject, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import { MySharedModules } from '../../_com/myshared.module';
import { QW } from '../../_lib/qw.helper';
import lgZoom from 'lightgallery/plugins/zoom';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import { LightgalleryModule } from 'lightgallery/angular';
import { MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgImageSliderModule } from 'ng-image-slider';
declare var turf: any;
@Component({
  selector: 'app-mapbox-2',
  standalone: true,
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.scss'],
  imports: [CommonModule, MySharedModules, LightgalleryModule, NgbPaginationModule, NgbAlertModule, NgImageSliderModule],
})
export class MapboxComponent implements OnInit {
  CloseModal() {
    this.gizle = true;
  }

  public dialog = inject(MatDialog);
  allpoints: any;
  map!: mapboxgl.Map;
  imagesslide: img[] = [];
  clickseyyahkod: any
  panelOpenState = true;
  visible = true;
  point_info_dialog: any = [];
  yuzyillar: [number, number][] = [[13, 0], [14, 0], [15, 0], [16, 0], [17, 0], [18, 0], [19, 0]];
  featureCollection: any = [];
  points: any[] = [];
  alintilar: any[] = [];
  maps_data: any;
  all_dialog_info: any[] = [];
  dialog_info_index: any;
  dialogImgs: any;
  private animationFrameId: number | null = null;
  gizle: boolean = true;
  line_animation_kod: any


  constructor(
    private route: ActivatedRoute
  ) {

  }

  async ngOnInit() {

    const res = await fetch("/assets/json/19_james_morier_smooth_2.json")
    this.allpoints = await res.json();

    this.maps_data = this.allpoints;

    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v11',
      zoom: 6,

      center: [33.422222, 38.630554],
    });

    this.map.on('load', async () => {

      this.map.loadImage(
        '../../../assets/img/yapi.png',
        (error, image: any) => {
          if (error) throw error;

          // Add the image to the map style.
          this.map.addImage('yapi', image);
        });
      this.map.loadImage(
        '../../../assets/img/yaklasikkonum.png',
        (error, image: any) => {
          if (error) throw error;

          // Add the image to the map style.
          this.map.addImage('yaklasikkonum', image);
        });
      this.map.loadImage(
        '../../../assets/img/yerlesimyeri.png',
        (error, image: any) => {
          if (error) throw error;

          // Add the image to the map style.
          this.map.addImage('yerlesimyeri', image);
        });

      let enlem = this.route.snapshot.paramMap.get('enlem')
      let boylam = this.route.snapshot.paramMap.get('boylam')

      if (enlem != null && boylam != null) {
        this.map.flyTo({
          center: [+boylam + 0.4, +enlem],
          zoom: 10,
          essential: true // Kullanıcı hareketleri engellenmez
        });
        this.map.addSource('blinking-point', {
          type: 'geojson',
          data: {
            "type": "FeatureCollection",
            "features": [{
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  +boylam!,
                  +enlem!
                ]
              }
            }]
          }
        });
        this.map.addLayer({
          id: 'blinking-point-layer',
          type: 'circle',
          source: 'blinking-point',
          paint: {
            'circle-radius': 10,
            'circle-color': '#ff0000', // Başlangıçta kırmızı
            'circle-opacity': 1
          }
        });
        let isVisible = true;
        let counter = 0; // Sayaç başlatılır

        const intervalId = setInterval(() => {
          isVisible = !isVisible;
          this.map.setPaintProperty(
            'blinking-point-layer',
            'circle-opacity',
            isVisible ? 1 : 0
          );

          counter++; // Her işlemde sayaç bir artırılır

          if (counter >= 60) {
            clearInterval(intervalId); // 20 işlem sonrası interval durdurulur
          }

        }, 500); // Her 500ms'de bir yanıp sönsün
        let lokasyon = await QW.json('/lokasyon/getId/' + enlem + '/' + boylam);
        let info = await QW.json('/arazicalismasi/' + lokasyon.result.Envanter_Kodu);
        if (info != null) {
          this.point_info_dialog = await QW.json('/arazicalismasi/' + lokasyon.result.Envanter_Kodu);
          this.gizle = false;
        }
      }

      this.maps_data.forEach((element: any) => {
        this.map.addSource(element.name, {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: element.features,
          },
        });
      });
      this.maps_data.forEach((element: any) => {

        this.map.addLayer({
          id: element.name + 'kara',
          type: 'line',
          source: element.name,
          layout: {
            visibility: 'none',
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': element.crs.properties.color,
            'line-width': 3,
            'line-dasharray': [1, 0],
          },
          filter: ['==', 'tür', 'kara'],
        });

        this.map.addLayer({
          id: element.name + 'atlama',
          type: 'line',
          source: element.name,
          layout: {
            visibility: 'none',
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': element.crs.properties.color,
            'line-width': 3,
            'line-dasharray': [4, 3],
          },
          filter: ['==', 'tür', 'atlama'],
        });
        this.map.addLayer({
          id: element.name + 'deniz',
          type: 'line',
          source: element.name,
          layout: {
            visibility: 'none',
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': element.crs.properties.color,
            'line-width': 3,
            'line-dasharray': [4, 3],
          },
          filter: ['==', 'tür', 'deniz'],
        });


      });
    });

  }

  mapsDataFilter(event: any) {

    this.maps_data = this.allpoints.filter((feature: any) =>
      feature.name_tr.toLowerCase().includes(event.target.value.toLowerCase())
    );


    this.yuzyillar = Array.from(
      new Set(
        this.maps_data
          .map((feature: any) => feature.crs.properties.yuzyil)
          .filter((yuzyil: any) => yuzyil !== undefined && yuzyil !== null)
      )
    )
      .sort((a: any, b: any) => a - b)
      .map((yuzyil) => [yuzyil as number, 0] as [number, number]); // Tür açıkça belirtiliyor



  }
  incrementSecondElementPlus(target: number): void {
    const index = this.yuzyillar.findIndex(([first]) => first === target);

    if (index !== -1) {
      this.yuzyillar[index][1] += 1;
    }
  }
  incrementSecondElementMinus(target: number): void {
    const index = this.yuzyillar.findIndex(([first]) => first === target);

    if (index !== -1) {
      this.yuzyillar[index][1] -= 1;
    }
  }


  updateAllComplete(data: any, yuzyil: number) {



    if (this.map.getLayoutProperty(data + 'kara', 'visibility') == 'none') {
      this.DrawPoint(data);
      this.map.setLayoutProperty(data + 'deniz', 'visibility', 'visible');
      this.map.setLayoutProperty(data + 'kara', 'visibility', 'visible');
      this.map.setLayoutProperty(data + 'atlama', 'visibility', 'visible');
      this.incrementSecondElementPlus(yuzyil);


    } else {
      this.map.setLayoutProperty(data + 'deniz', 'visibility', 'none');
      this.map.setLayoutProperty(data + 'kara', 'visibility', 'none');
      this.map.setLayoutProperty(data + 'atlama', 'visibility', 'none');
      this.map.setLayoutProperty(data + 'heatmap', 'visibility', 'none');
      this.incrementSecondElementMinus(yuzyil);


      var location = [
        { point_type: 'YAPI', icon: 'yapi', size: 0.1 },
        { point_type: 'YERLEŞİM YERİ', icon: 'yerlesimyeri', size: 0.1 },
        { point_type: 'YAKLAŞIK KONUM', icon: 'yaklasikkonum', size: 0.1 },
      ];
      location.forEach((c) => {
        this.map.removeLayer(data + c.point_type);
        this.map.off('click', data + c.point_type, this.onClickHandler);

      });
      this.map.removeLayer(data + 'heatmap');
      this.map.removeLayer(data + 'clusters');
      this.map.removeLayer(data + 'clusterstext');
      this.map.removeSource(data + 'point');
      this.map.removeSource(data + 'cluster');
    }
  }
  Heatmap(id: any) {

    //noktalrı sakla heatmap aç

    var location = [
      { point_type: 'YAPI', icon: 'yapi', size: 2 },
      { point_type: 'YERLEŞİM YERİ', icon: 'yerlesimyeri', size: 0.1 },
      { point_type: 'YAKLAŞIK KONUM', icon: 'yaklasikkonum', size: 0.1 },
    ];
    if (this.map.getLayoutProperty(id + 'heatmap', 'visibility') == 'none') {
      location.forEach((c) => {
        this.map.setLayoutProperty(id + c.point_type, 'visibility', 'none');

      });
      this.map.setLayoutProperty(id + 'heatmap', 'visibility', 'visible');
    }
    else {
      location.forEach((c) => {
        this.map.setLayoutProperty(id + c.point_type, 'visibility', 'visible');

      });
      this.map.setLayoutProperty(id + 'heatmap', 'visibility', 'none');
    }

  }
  Clustermap(id: any) {
    var location = [
      { point_type: 'YAPI', icon: 'yapi', size: 2 },
      { point_type: 'YERLEŞİM YERİ', icon: 'yerlesimyeri', size: 0.1 },
      { point_type: 'YAKLAŞIK KONUM', icon: 'yaklasikkonum', size: 0.1 },
    ];
    if (this.map.getLayoutProperty(id + 'clusters', 'visibility') == 'none') {

      this.map.setLayoutProperty(id + 'clusters', 'visibility', 'visible');
      this.map.setLayoutProperty(id + 'clusterstext', 'visibility', 'visible');

    }
    else {

      this.map.setLayoutProperty(id + 'clusters', 'visibility', 'none');
      this.map.setLayoutProperty(id + 'clusterstext', 'visibility', 'none');
    }

  }
  async DrawPoint(SeyyahnameKod: string) {
    let seyyahallpoint = await QW.json('/noktalar/' + SeyyahnameKod);

    //seyyahın tüm noktaları points arrayi içine at
    this.points.push(seyyahallpoint.data);

    this.pushFeatureCollectionPoint(this.featureCollection);
    this.map.addSource(SeyyahnameKod + 'point', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: this.featureCollection,
      },
    });
    this.map.addSource(SeyyahnameKod + 'cluster', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: this.featureCollection,
      },
      cluster: true,
      clusterMaxZoom: 11, // Max zoom to cluster points on
      clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
    });
    var location = [
      { point_type: 'YAPI', icon: 'yapi', size: 0.1 },
      { point_type: 'YERLEŞİM YERİ', icon: 'yerlesimyeri', size: 0.1 },
      { point_type: 'YAKLAŞIK KONUM', icon: 'yaklasikkonum', size: 0.1 },
    ];
    location.forEach((c) => {
      this.map.addLayer({
        id: SeyyahnameKod + c.point_type,
        type: 'symbol',
        source: SeyyahnameKod + 'point',
        'layout': {
          'icon-image': c.icon,
          'icon-size': c.size,
          'text-field': [
            'format',
            ['upcase', ['get', 'yer_ismi']],
            { 'font-scale': 0.8 },
            '\n\n\n\n\n',

          ],
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold']
        },
        'paint': {
          'text-color': '#eee',
          'text-halo-color': '#ffffff',
          'text-halo-width': 0.5
        },

        filter: ['==', ['get', 'tespit_edilen_konum_olcegi'], c.point_type],
        minzoom: 6
      });

    });
    this.map.addLayer({
      id: SeyyahnameKod + 'clusters',
      type: 'circle',
      source: SeyyahnameKod + 'cluster',
      filter: ['has', 'point_count'],
      layout: { visibility: 'none' },
      paint: {

        'circle-color': [
          'step',
          ['get', 'point_count'],
          '#51bbd6',
          100,
          '#f1f075',
          750,
          '#f28cb1'
        ],
        'circle-radius': [
          'step',
          ['get', 'point_count'],
          50,
          1000,
          300,
          7500,
          400
        ]
      }
    });

    this.map.addLayer({
      id: SeyyahnameKod + 'clusterstext',
      type: 'symbol',
      source: SeyyahnameKod + 'cluster',
      filter: ['has', 'point_count'],
      layout: {
        visibility: 'none',
        'text-field': ['get', 'point_count_abbreviated'],
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12
      }
    });

    this.map.addLayer({
      id: SeyyahnameKod + "heatmap",
      type: 'heatmap',
      source: SeyyahnameKod + 'point',
      layout: { visibility: 'none' },
      paint: {
        'heatmap-weight': [
          'interpolate',
          ['linear'],
          ['get', 'weight'],
          0,
          0,
          6,
          1,
        ],
        'heatmap-intensity': 1,
        'heatmap-radius': 33.8,
        'heatmap-opacity': 0.8,
        'heatmap-color': [
          'interpolate',
          ['linear'],
          ['heatmap-density'],
          0,
          'rgba(255, 255, 255, 0)', // Şeffaf
          0.2,
          'rgb(255, 204, 204)', // Açık kırmızı
          0.4,
          'rgb(255, 153, 153)', // Orta kırmızı
          0.6,
          'rgb(255, 102, 102)', // Koyu kırmızı
          0.8,
          'rgb(255, 0, 0)' // Tam kırmızı
        ],
      },


    });
    this.points = [];
    this.featureCollection = [];

    location.forEach((c) => {
      this.map.on('mouseenter', SeyyahnameKod + c.point_type, () => {
        this.map.getCanvas().style.cursor = 'pointer';
      });

      this.map.on('mouseleave', SeyyahnameKod + c.point_type, () => {
        this.map.getCanvas().style.cursor = '';
      });

      this.clickseyyahkod = SeyyahnameKod;
      this.map.on('click', SeyyahnameKod + c.point_type, this.onClickHandler);
    });
  }

  pushFeatureCollectionPoint(featureCollection: any) {
    this.points.forEach((element: any) => {
      element.forEach((point: any) => {
        if (point.boylam != 0 || point.enlem != 0) {
          let data = [point.boylam, point.enlem];
          featureCollection.push({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: data,
            },
            properties: {
              Point_id: point.seyahname_kodu + ',' + point.id,
              tespit_edilen_konum_olcegi: point.tespit_edilen_konum_olcegi,
              seyahname_kodu: point.seyahname_kodu,
              yer_ismi: point.mekanin_gunumuzdeki_adi
            },
          });
        }
      });
    });
  }
  openDialogİnfo(): void {
    this.dialog.open(DialogAnimationsExampleDialogİnfo, {
      panelClass: ["custom-dialog-info"],
      width: '300px',

    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      panelClass: ["custom-dialog-container", "mat-mdc-dialog-actions"],
      width: '25%',
      height: 'auto',
      maxHeight: '100vh',
      maxWidth: '100vw',
      position: {
        right: '30px',
      },
      data: this.getDialogData()
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == undefined)
        this.gizle = true;
      else
        this.gizle = false;

    });

    dialogRef.keydownEvents().subscribe(async (event: { shiftKey: any; key: string }) => {


      if (event.key === 'ArrowRight') {
        this.imagesslide = [];
        this.alintilar = [];

        if (this.dialog_info_index != this.all_dialog_info.length - 1) {
          this.dialog_info_index = this.dialog_info_index + 1;

          if (this.all_dialog_info[this.dialog_info_index].enlem != 0) {
            if (this.all_dialog_info[this.dialog_info_index].yapi_envanter_kodu != "-") {
              this.point_info_dialog = await QW.json('/arazicalismasi/' + this.all_dialog_info[this.dialog_info_index].yapi_envanter_kodu);
              this.point_info_dialog.bolum_chapter_mektupnumarasi = this.all_dialog_info[this.dialog_info_index].bolum_chapter_mektupnumarasi;
              this.point_info_dialog.sayfa_numarasi = this.all_dialog_info[this.dialog_info_index].sayfa_numarasi;
              this.point_info_dialog.seyahat_adimi = this.all_dialog_info[this.dialog_info_index].seyahat_adimi;
              this.dialogImgs = await QW.json('/galeri/filter/' + this.all_dialog_info[this.dialog_info_index].yapi_envanter_kodu);
              this.dialogImgs = this.dialogImgs.images;
              this.dialogImgs.forEach((element: any) => {

                const newImage: img = {
                  image: 'http://localhost:3000/file/' + element.imgname,
                  thumbImage: 'http://localhost:3000/file/' + element.imgname,
                  title: element.metin
                };

                this.imagesslide.push(newImage);

              });
            }
            let alintilar = await QW.json('/noktalar/alinti/' + this.all_dialog_info[this.dialog_info_index].enlem + "/" + this.all_dialog_info[this.dialog_info_index].boylam)

            alintilar.Id.forEach((element: any) => {

              if (element.alintilar != "")
                this.alintilar.push([element.alintilar, element.seyahatname_adi, element.yazar, element.yuzyil]);


            });
    this.alintilar.sort((a: any, b: any) => +a[3].split(".")[0] -  +b[3].split(".")[0])

            if (this.all_dialog_info[this.dialog_info_index].yapi_envanter_kodu == "-") {

              this.point_info_dialog = this.all_dialog_info[this.dialog_info_index];


            }
            this.point_info_dialog.alintilar = this.alintilar

            dialogRef.componentInstance.data = this.getDialogData()
            this.map.flyTo({ center: [parseFloat(this.all_dialog_info[this.dialog_info_index].boylam), parseFloat(this.all_dialog_info[this.dialog_info_index].enlem)], zoom: 11, speed: 0.6 });
          }
        }
      }
      if (event.key === 'ArrowLeft') {
        this.imagesslide = [];
        this.alintilar = [];
        if (this.dialog_info_index != 0) {
          this.dialog_info_index = this.dialog_info_index - 1;

          if (this.all_dialog_info[this.dialog_info_index].enlem != 0) {
            if (this.all_dialog_info[this.dialog_info_index].yapi_envanter_kodu != "-") {
              this.point_info_dialog = await QW.json('/arazicalismasi/' + this.all_dialog_info[this.dialog_info_index].yapi_envanter_kodu);
              this.point_info_dialog.bolum_chapter_mektupnumarasi = this.all_dialog_info[this.dialog_info_index].bolum_chapter_mektupnumarasi;
              this.point_info_dialog.sayfa_numarasi = this.all_dialog_info[this.dialog_info_index].sayfa_numarasi;
              this.point_info_dialog.seyahat_adimi = this.all_dialog_info[this.dialog_info_index].seyahat_adimi;
              this.dialogImgs = await QW.json('/galeri/filter/' + this.all_dialog_info[this.dialog_info_index].yapi_envanter_kodu);
              this.dialogImgs = this.dialogImgs.images;
              this.dialogImgs.forEach((element: any) => {

                const newImage: img = {
                  image: 'http://localhost:3000/file/' + element.imgname,
                  thumbImage: 'http://localhost:3000/file/' + element.imgname,
                  title: element.metin
                };

                this.imagesslide.push(newImage);



              });
            }
            let alintilar = await QW.json('/noktalar/alinti/' + this.all_dialog_info[this.dialog_info_index].enlem + "/" + this.all_dialog_info[this.dialog_info_index].boylam)

            alintilar.Id.forEach((element: any) => {
              if (element.alintilar != "")
                this.alintilar.push([element.alintilar, element.seyahatname_adi, element.yazar, element.yuzyil]);


            });
            this.alintilar.sort((a: any, b: any) => +a[3].split(".")[0] - +b[3].split(".")[0])


            if (this.all_dialog_info[this.dialog_info_index].yapi_envanter_kodu == "-") {

              this.point_info_dialog = this.all_dialog_info[this.dialog_info_index];

            }
            this.point_info_dialog.alintilar = this.alintilar


            dialogRef.componentInstance.data = this.getDialogData()
            this.map.flyTo({ center: [parseFloat(this.all_dialog_info[this.dialog_info_index].boylam), parseFloat(this.all_dialog_info[this.dialog_info_index].enlem)], zoom: 11, speed: 0.6 });
          }
        }
      }

    });
  }

  onClickHandler = async (e: any) => {

    this.imagesslide = [];
    this.alintilar = [];
    this.point_info_dialog = [];
    const description = e.features[0].properties;
    let id = description.Point_id.split(',')[1];

    let clickPoint = await QW.json('/noktalar/' + description.seyahname_kodu + '/' + id);
    this.point_info_dialog = clickPoint.data[0]
    if (clickPoint.data[0]["yapi_envanter_kodu"] != "-") {

      this.point_info_dialog = await QW.json('/arazicalismasi/' + clickPoint.data[0]['yapi_envanter_kodu']);
      this.point_info_dialog.bolum_chapter_mektupnumarasi = clickPoint.data[0]['bolum_chapter_mektupnumarasi'];
      this.point_info_dialog.sayfa_numarasi = clickPoint.data[0]['sayfa_numarasi'];
      this.point_info_dialog.seyahat_adimi = clickPoint.data[0]['seyahat_adimi'];
      this.dialogImgs = await QW.json('/galeri/filter/' + clickPoint.data[0]['yapi_envanter_kodu']);
      this.dialogImgs = this.dialogImgs.images;
      this.dialogImgs.forEach((element: any) => {
        const newImage: img = {
          image: 'http://localhost:3000/file/' + element.imgname,
          thumbImage: 'http://localhost:3000/file/' + element.imgname,
          title: element.metin
        };
        this.imagesslide.push(newImage);
      });


    }
    let filter = (element: any) => element.id == clickPoint.data[0]['id'];
    var allpoint = await QW.json('/noktalar/' + description.seyahname_kodu);
    this.all_dialog_info = allpoint.data;
    this.dialog_info_index = this.all_dialog_info.findIndex(filter);
    let alintilar = await QW.json('/noktalar/alinti/' + clickPoint.data[0]['enlem'] + "/" + clickPoint.data[0]['boylam'])

    this.map.flyTo({ center: [parseFloat(clickPoint.data[0]['boylam']), parseFloat(clickPoint.data[0]['enlem'])], zoom: 11, speed: 0.6 });

    alintilar.Id.forEach((element: any) => {

      if (element.alintilar != "")
        this.alintilar.push([element.alintilar, element.seyahatname_adi, element.yazar, element.yuzyil, element.sayfa_numarasi]);

    });
    this.alintilar.sort((a: any, b: any) => +a[3].split(".")[0] - +b[3].split(".")[0])



    if (this.all_dialog_info[this.dialog_info_index].yapi_envanter_kodu == "-") {

      this.point_info_dialog = clickPoint.data[0];

    }
    this.point_info_dialog.alintilar = this.alintilar

    this.openDialog();


  }
  async WatchLine(data: any) {
    const zoomLevel = 10; // Belirlediğin zoom seviyesi
    const cameraAltitude = 200000;

    // Rotanın uzunluğunu hesapla
    const route = await this.getTargetRoute(data);
    const cameraroute = await this.getCameraRoute(data);
    const routeDistance = turf.lineDistance(turf.lineString(route));
    const cameraRouteDistance = turf.lineDistance(turf.lineString(cameraroute));

    // Animasyon süresini rotanın uzunluğuna göre ayarla (Örnek: her km için 10 saniye)
    const animationDuration = routeDistance * 100;

    let start: number;

    // Zoom seviyesini ayarla
    this.map.setZoom(zoomLevel);

    const frame = (time: number) => {
      if (!start) start = time;
      const phase = (time - start) / animationDuration;

      if (phase > 1) {
        setTimeout(() => {
          start = 0.0;
        }, 2000);
      }

      const alongRoute = turf.along(
        turf.lineString(route),
        routeDistance * phase
      ).geometry.coordinates;

      const alongCamera = turf.along(
        turf.lineString(cameraroute),
        cameraRouteDistance * phase
      ).geometry.coordinates;

      const camera = this.map.getFreeCameraOptions();
      camera.position = mapboxgl.MercatorCoordinate.fromLngLat(
        {
          lng: alongCamera[0],
          lat: alongCamera[1]
        },
        cameraAltitude
      );

      camera.lookAtPoint({
        lng: alongRoute[0],
        lat: alongRoute[1]
      });

      this.map.setFreeCameraOptions(camera);

      // Zoom seviyesini tekrar ayarla
      this.map.setZoom(zoomLevel);

      this.animationFrameId = window.requestAnimationFrame(frame); // Save the frame ID
    };

    this.animationFrameId = window.requestAnimationFrame(frame); // Start the animation
    this.map.setPitch(-10);
    this.map.setBearing(-90);
  }


  private async getTargetRoute(id: any) {

    return await QW.json('/allcordinats/' + id);

  }

  private async getCameraRoute(id: any) {

    return await QW.json('/allcordinats/' + id);

  }
  stopAnimation() {
    if (this.animationFrameId !== null) {

      window.cancelAnimationFrame(this.animationFrameId); // Cancel the animation
      this.animationFrameId = null; // Reset the ID
      this.map.easeTo({
        center: [33.422222, 38.630554],
        bearing: 0,
        pitch: 0,
        zoom: 6,
        duration: 1000
      });



    }
  }
  getDialogData() {
    return {
      Envanter_Kodu: this.point_info_dialog.Envanter_Kodu,
      Yapi_Adi: this.point_info_dialog.Yapi_Adi,
      Enlem: this.point_info_dialog.enlem,
      Boylam: this.point_info_dialog.boylam,
      Guzergah: this.point_info_dialog.Guzergah,
      Alternatif_Adi: this.point_info_dialog.Alternatif_Adi,
      Donemi: this.point_info_dialog.Donemi,
      Kitabesi: this.point_info_dialog.Kitabesi,
      Banisi: this.point_info_dialog.Banisi,
      Seyahatnamelerdeki_Anlatimi: this.point_info_dialog.Seyahatnamelerdeki_Anlatimi,
      Durumu: this.point_info_dialog.Durumu,
      Bugunki_Kullanimi: this.point_info_dialog.Bugunki_Kullanimi,
      Mimari_Ozellikler: this.point_info_dialog.Mimari_Ozellikler,
      Yasama_Ve_Eski_Kullanima_Dair_İzler: this.point_info_dialog.Yasama_Ve_Eski_Kullanima_Dair_İzler,
      Yapim_Teknigi_Ve_Malzeme: this.point_info_dialog.Yapim_Teknigi_Ve_Malzeme,
      Literatur_Ve_Arsiv_Kaynaklarindan_Notlar: this.point_info_dialog.Literatur_Ve_Arsiv_Kaynaklarindan_Notlar,
      Kaynakca: this.point_info_dialog.Kaynakca,
      Arazi_Calismasi_Tarihi: this.point_info_dialog.Arazi_Calismasi_Tarihi,
      Seyahat_Name_Adi: this.point_info_dialog.seyahatname_adi,
      Alintilar: this.point_info_dialog.alintilar,
      Mekan_Adi: this.point_info_dialog.anlatida_gecen_mekan_adi,
      Gunumuzdeki_Mekan_Adi: this.point_info_dialog.mekanin_gunumuzdeki_adi,
      Yuzyil: this.point_info_dialog.yuzyil,
      Bolum_Numarasi: this.point_info_dialog.bolum_chapter_mektupnumarasi,
      Sayfa_Numarasi: this.point_info_dialog.sayfa_numarasi,
      Seyahat_Adimi: this.point_info_dialog.seyahat_adimi,
      DialogImgs: this.imagesslide[0]?.image
    };
  }


}
@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
  styleUrls: ['mapbox.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatDialogTitle, MatDialogContent, LightgalleryModule, MySharedModules],
})
export class DialogContentExampleDialog {
  images: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  onBeforeSlide = (detail: BeforeSlideDetail): void => {
    const { index, prevIndex } = detail;
    console.log(index, prevIndex);
  };

  settings = {
    counter: false,
    plugins: [lgZoom],
  };


}
@Component({
  selector: 'dialog-animations-example-dialog-info',
  templateUrl: 'dialog-animationinfo.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatDialogTitle, MatDialogContent, LightgalleryModule, MySharedModules],

})
export class DialogAnimationsExampleDialogİnfo {
}



interface img {

  image: string

  thumbImage: string

  title: string



}
