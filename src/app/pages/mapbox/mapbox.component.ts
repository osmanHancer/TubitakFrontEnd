import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { environment } from '../../../environments/environment';
import points from '../../../assets/19_james_morier_smooth_2.json';
import { MySharedModules } from '../../_com/myshared.module';
import { QW } from '../../_lib/qw.helper';
import { LayoutAdminComponent } from "../../_layoutadmin/layoutadmin.component";
import lgZoom from 'lightgallery/plugins/zoom';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import { LightgalleryModule } from 'lightgallery/angular';
import { MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import 'mapbox-gl/dist/mapbox-gl.css';
import { NgImageSliderModule } from 'ng-image-slider';
import { elementAt } from 'rxjs';
import { identifierName } from '@angular/compiler';
declare var turf: any;
@Component({
  selector: 'app-mapbox',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MySharedModules, LayoutAdminComponent, LightgalleryModule, NgbPaginationModule, NgbAlertModule, NgImageSliderModule],
  templateUrl: './mapbox.component.html',
  styleUrl: './mapbox.component.scss'
})
export class MapboxComponent {

  CloseModal() {
    this.gizle = true;
  }
  public dialog = inject(MatDialog);
  map!: mapboxgl.Map;
  imagesslide: img[] = [];
  panelOpenState = false;
  visible = true;
  point_info_dialog: any = [];
  yuzyillar: any = [13, 14, 15, 16, 17, 18, 19];
  featureCollection: any = [];
  points: any[] = [];
  maps_data = points;
  all_dialog_info: any[] = [];
  dialog_info_index: any;
  router: any;
  dialogImgs: any;
  play: any
  private animationFrameId: number | null = null;
  gizle: any
  dashArraySequence = [
    [0, 4, 3],
    [0.5, 4, 2.5],
    [1, 4, 2],
    [1.5, 4, 1.5],
    [2, 4, 1],
    [2.5, 4, 0.5],
    [3, 4, 0],
    [0, 0.5, 3, 3.5],
    [0, 1, 3, 3],
    [0, 1.5, 3, 2.5],
    [0, 2, 3, 2],
    [0, 2.5, 3, 1.5],
    [0, 3, 3, 1],
    [0, 3.5, 3, 0.5]
  ];

  line_animation_kod: any

  onBeforeSlide = (detail: BeforeSlideDetail): void => {
    const { index, prevIndex } = detail;
    console.log(index, prevIndex);
  };

  settings = {
    counter: false,
    plugins: [lgZoom],
    interval: 100
  };


  async ngOnInit() {


    this.gizle = true;
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v11',
      zoom: 6,

      center: [27.422222, 38.630554],
    });

    this.map.on('load', () => {

      this.map.loadImage(
        '../../../assets/icons/castle.png',
        (error, image: any) => {
          if (error) throw error;

          // Add the image to the map style.
          this.map.addImage('castle_1', image);
        });
      this.map.loadImage(
        '../../../assets/icons/houses.png',
        (error, image: any) => {
          if (error) throw error;

          // Add the image to the map style.
          this.map.addImage('houses', image);
        });

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

        // this.map.addLayer({
        //   id: element.name + "dasharray",
        //   type: 'line',
        //   source: element.name,
        //   layout: {
        //     visibility: 'none',
        //     'line-join': 'round',
        //     'line-cap': 'round',
        //   },
        //   paint: {
        //     'line-color': "yellow",
        //     'line-width': 2,
        //     'line-dasharray': [4, 3],
        //   },

        // });
      });
    });
  }

  updateAllComplete(data: any) {

    if (this.map.getLayoutProperty(data + 'kara', 'visibility') == 'none') {
      this.DrawPoint(data);
      this.map.setLayoutProperty(data + 'deniz', 'visibility', 'visible');
      this.map.setLayoutProperty(data + 'kara', 'visibility', 'visible');
      this.map.setLayoutProperty(data + 'atlama', 'visibility', 'visible');
      // this.map.setLayoutProperty(data+"dasharray", 'visibility', 'visible');
      this.line_animation_kod = data;
      // this.animateDashArray(0);
    } else {
      this.map.setLayoutProperty(data + 'deniz', 'visibility', 'none');
      this.map.setLayoutProperty(data + 'kara', 'visibility', 'none');
      this.map.setLayoutProperty(data + 'atlama', 'visibility', 'none');
      this.map.setLayoutProperty(data + 'heatmap', 'visibility', 'none');

      // this.map.setLayoutProperty(data+"dasharray", 'visibility', 'none');
      this.map.removeLayer(data + 'YAPI');
      this.map.removeLayer(data + 'YERLEŞİM YERİ');
      this.map.removeLayer(data + 'YAKLAŞIK KONUM');
      this.map.removeLayer(data + 'heatmap');
      this.map.removeSource(data + 'point');
    }
  }
  Heatmap(id:any){
    if (this.map.getLayoutProperty(id + 'heatmap', 'visibility') == 'none') {
      this.map.setLayoutProperty(id + 'heatmap', 'visibility', 'visible');
    }
    else {
      this.map.setLayoutProperty(id + 'heatmap', 'visibility', 'none');
    }
  
  }

  async DrawPoint(SeyyahnameKod: string) {
    let user_2 = await QW.json('/users/' + SeyyahnameKod);
    this.points.push(user_2.data);

    this.pushFeatureCollectionPoint(this.featureCollection);
    this.map.addSource(SeyyahnameKod + 'point', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: this.featureCollection,
      },
    });
    var location = [
      { point_type: 'YAPI', icon: 'castle_1', size: 2 },
      { point_type: 'YERLEŞİM YERİ', icon: 'houses', size: 0.1 },
      { point_type: 'YAKLAŞIK KONUM', icon: 'houses', size: 0.1 },
    ];
    location.forEach((c) => {
      this.map.addLayer({
        id: SeyyahnameKod + c.point_type,
        type: 'symbol',
        source: SeyyahnameKod + 'point',
        'layout': {
          'icon-image': c.icon, // reference the image
          'icon-size': c.size
        },

        filter: ['==', ['get', 'tespit_edilen_konum_olcegi'], c.point_type],
      });

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
          'rgba(236,222,239,0)',
          0.2,
          'rgb(208,209,230)',
          0.4,
          'rgb(166,189,219)',
          0.6,
          'rgb(103,169,207)',
          0.8,
          'rgb(28,144,153)'
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

      this.map.on('click', SeyyahnameKod + c.point_type, async (e: any) => {



        this.imagesslide = [];

        const description = e.features[0].properties;
        let id = description.Point_id.split(',')[1];
        let point = await QW.json('/users/' + SeyyahnameKod + '/' + id);

        this.point_info_dialog = await QW.json('/arazicalismasi/' + point.data[0]['yapi_envanter_kodu']);



        let lokasyonId = await QW.json('/lokasyon/getId/' + point.data[0]['yapi_envanter_kodu']);
        this.dialogImgs = await QW.json('/galeri/filter/' + lokasyonId.Id);
        this.dialogImgs = this.dialogImgs.images;
        this.dialogImgs.forEach((element: any) => {

          const newImage: img = {
            image: 'http://localhost:3000/file/' + element.imgname,
            thumbImage: 'http://localhost:3000/file/' + element.imgname,
            title: element.metin
          };

          this.imagesslide.push(newImage);


        });
        let filter = (element: any) => element.yapi_envanter_kodu == point.data[0]['yapi_envanter_kodu'];

        var allpoint = await QW.json('/users/' + SeyyahnameKod);
        this.all_dialog_info = allpoint.data;

        this.dialog_info_index = this.all_dialog_info.findIndex(filter);
        this.openDialog();

        this.map.flyTo({ center: [parseFloat(this.point_info_dialog.Boylam), parseFloat(this.point_info_dialog.Enlem)], zoom: 11, speed: 0.6 });
      });
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
            },
          });
        }
      });
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
      data: {
        Envanter_Kodu: this.point_info_dialog.Envanter_Kodu,
        Yapi_Adi: this.point_info_dialog.Yapi_Adi,
        Enlem: this.point_info_dialog.Enlem,
        Boylam: this.point_info_dialog.Boylam,
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
        Arazi_Calismasi_Ekibi: this.point_info_dialog.Arazi_Calismasi_Ekibi,
        DialogImgs: this.imagesslide[0].image,
      },
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


        this.dialog_info_index = this.dialog_info_index + 1;
        this.point_info_dialog = await QW.json('/arazicalismasi/' + this.all_dialog_info[this.dialog_info_index].yapi_envanter_kodu);
        let lokasyonId = await QW.json('/lokasyon/getId/' + this.all_dialog_info[this.dialog_info_index].yapi_envanter_kodu);
        this.dialogImgs = await QW.json('/galeri/filter/' + lokasyonId.Id);
        this.dialogImgs = this.dialogImgs.images;
        this.dialogImgs.forEach((element: any) => {

          const newImage: img = {
            image: 'http://localhost:3000/file/' + element.imgname,
            thumbImage: 'http://localhost:3000/file/' + element.imgname,
            title: element.metin
          };

          this.imagesslide.push(newImage);
          dialogRef.componentInstance.data = {
            Envanter_Kodu: this.point_info_dialog.Envanter_Kodu,
            Yapi_Adi: this.point_info_dialog.Yapi_Adi,
            Enlem: this.point_info_dialog.Enlem,
            Boylam: this.point_info_dialog.Boylam,
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
            Arazi_Calismasi_Ekibi: this.point_info_dialog.Arazi_Calismasi_Ekibi,
            DialogImgs: this.imagesslide[0].image,
          };


        });

        this.map.flyTo({ center: [parseFloat(this.point_info_dialog.Boylam), parseFloat(this.point_info_dialog.Enlem)], zoom: 11, speed: 0.6 });
      }
      if (event.key === 'ArrowLeft') {

        this.imagesslide = [];


        this.dialog_info_index = this.dialog_info_index - 1;

        this.point_info_dialog = await QW.json('/arazicalismasi/' + this.all_dialog_info[this.dialog_info_index].yapi_envanter_kodu);

        let lokasyonId = await QW.json('/lokasyon/getId/' + this.all_dialog_info[this.dialog_info_index].yapi_envanter_kodu);
        this.dialogImgs = await QW.json('/galeri/filter/' + lokasyonId.Id);
        this.dialogImgs = this.dialogImgs.images;
        this.dialogImgs.forEach((element: any) => {

          const newImage: img = {
            image: 'http://localhost:3000/file/' + element.imgname,
            thumbImage: 'http://localhost:3000/file/' + element.imgname,
            title: element.metin
          };

          this.imagesslide.push(newImage);

          dialogRef.componentInstance.data = {
            Envanter_Kodu: this.point_info_dialog.Envanter_Kodu,
            Yapi_Adi: this.point_info_dialog.Yapi_Adi,
            Enlem: this.point_info_dialog.Enlem,
            Boylam: this.point_info_dialog.Boylam,
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
            Arazi_Calismasi_Ekibi: this.point_info_dialog.Arazi_Calismasi_Ekibi,
            DialogImgs: this.imagesslide[0].image,
          };

        });

        this.map.flyTo({ center: [parseFloat(this.point_info_dialog.Boylam), parseFloat(this.point_info_dialog.Enlem)], zoom: 11, speed: 0.6 });
      }
    });
  }
  animateDashArray(timestamp: number): void {
    const newStep = Math.floor((timestamp / 50) % this.dashArraySequence.length);

    this.map.setPaintProperty(
      this.line_animation_kod + "dasharray",
      'line-dasharray',
      this.dashArraySequence[newStep]
    );

    requestAnimationFrame(this.animateDashArray.bind(this));
  }
  WatchLine(data: any) {

    const animationDuration = 40000;
    const cameraAltitude = 80000;
    const routeDistance = turf.lineDistance(turf.lineString(this.getTargetRoute(data)));
    const cameraRouteDistance = turf.lineDistance(turf.lineString(this.getCameraRoute(data)));

    let start: number;

    const frame = (time: number) => {
      if (!start) start = time;
      const phase = (time - start) / animationDuration;

      if (phase > 1) {
        setTimeout(() => {
          start = 0.0;
        }, 2000);
      }

      const alongRoute = turf.along(
        turf.lineString(this.getTargetRoute(data)),
        routeDistance * phase
      ).geometry.coordinates;

      const alongCamera = turf.along(
        turf.lineString(this.getCameraRoute(data)),
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
      this.animationFrameId = window.requestAnimationFrame(frame); // Save the frame ID


    }

    this.animationFrameId = window.requestAnimationFrame(frame); // Start the animation
  }
  private getTargetRoute(id: any) {

    return this.maps_data[id].allcordinats



  }

  private getCameraRoute(id: any) {



    return this.maps_data[id].allcordinats


  }
  stopAnimation() {
    if (this.animationFrameId !== null) {
      window.cancelAnimationFrame(this.animationFrameId); // Cancel the animation
      this.animationFrameId = null; // Reset the ID
      this.map.flyTo({ center: [27.422222, 38.630554], zoom: 6, speed: 1 });
    }
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
    private cdr: ChangeDetectorRef
  ) { }

  onBeforeSlide = (detail: BeforeSlideDetail): void => {
    const { index, prevIndex } = detail;
    console.log(index, prevIndex);
  };

  settings = {
    counter: false,
    plugins: [lgZoom],
  };

  ngOnChanges() {
    this.cdr.detectChanges();
  }
}


interface img {

  image: string

  thumbImage: string

  title: string



}
