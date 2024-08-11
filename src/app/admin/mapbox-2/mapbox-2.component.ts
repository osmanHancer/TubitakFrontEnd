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
@Component({
  selector: 'app-mapbox-2',
  standalone: true,
  templateUrl: './mapbox-2.component.html',
  styleUrls: ['./mapbox-2.component.scss'],
  imports: [CommonModule, RouterOutlet, MySharedModules, LayoutAdminComponent, LightgalleryModule,NgbPaginationModule, NgbAlertModule],
})
export class Mapbox2Component implements OnInit {
  CloseModal() {
    this.gizle = true;
  }
  public dialog = inject(MatDialog);
  map!: mapboxgl.Map;
  panelOpenState = false;
  visible = true;
  point_info_dialog: any = [];
  featureCollection: any = [];
  points: any[] = [];
  maps_data = points;
  all_dialog_info: any[] = [];
  dialog_info_index: any;
  router: any;
  dialogImgs: any;
  isDivVisible: boolean = false;
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
  };


  async ngOnInit() {

    this.point_info_dialog.Envanter_Kodu="swwswsws";
      this.point_info_dialog.Yapi_Adi="swwswsws";
      this.point_info_dialog.Enlem="swwswsws";
      this.point_info_dialog.Boylam="swwswsws";
      this.point_info_dialog.Guzergah="swwswsws";
      this.point_info_dialog.Alternatif_Adi="swwswsws";
      this.point_info_dialog.Donemi="swwswsws";
      this.point_info_dialog.Kitabesi="swwswsws";
      this.point_info_dialog.Banisi="swwswsws";
      this.point_info_dialog.Seyahatnamelerdeki_Anlatimi="swwswsws";
      this.point_info_dialog.Durumu="swwswsws";
      this.point_info_dialog.Bugunki_Kullanimi="swwswsws";
      this.point_info_dialog.Mimari_Ozellikler="swwswsws";
      this.point_info_dialog.Yasama_Ve_Eski_Kullanima_Dair_İzler="swwswsws";
      this.point_info_dialog.Yapim_Teknigi_Ve_Malzeme="swwswsws";
      this.point_info_dialog.Literatur_Ve_Arsiv_Kaynaklarindan_Notlar="swwswsws";
      this.point_info_dialog.Kaynakca="swwswsws";
      this.point_info_dialog.Arazi_Calismasi_Tarihi="swwswsws";
      this.point_info_dialog.Arazi_Calismasi_Ekibi="swwswsws";
      this.dialogImgs="swwswsws";
      this.gizle = true;
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v11',
      zoom: 6,
      center: [27.422222, 38.630554],
    });

    this.map.on('load', () => {
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

        this.map.addLayer({
          id: element.name+"dasharray",
          type: 'line',
          source: element.name,
          layout: {
            visibility: 'none',
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color':  "yellow",
            'line-width': 2,
            'line-dasharray': [4, 3],
          },

        });
      });
    });
  }

  updateAllComplete(data: any) {
    if (this.map.getLayoutProperty(data + 'kara', 'visibility') == 'none') {
      this.map.setLayoutProperty(data + 'deniz', 'visibility', 'visible');
      this.map.setLayoutProperty(data + 'kara', 'visibility', 'visible');
      this.map.setLayoutProperty(data + 'atlama', 'visibility', 'visible');
      this.map.setLayoutProperty(data+"dasharray", 'visibility', 'visible');
      this.line_animation_kod = data;
      this.animateDashArray(0);
      this.DrawPoint(data);
    } else {
      this.map.setLayoutProperty(data + 'deniz', 'visibility', 'none');
      this.map.setLayoutProperty(data + 'kara', 'visibility', 'none');
      this.map.setLayoutProperty(data + 'atlama', 'visibility', 'none');
      this.map.setLayoutProperty(data+"dasharray", 'visibility', 'none');


      this.map.removeLayer(data + 'YAPI');
      this.map.removeLayer(data + 'YERLEŞİM YERİ');
      this.map.removeLayer(data + 'YAKLAŞIK KONUM');
      this.map.removeSource(data + 'point');
    }
  }

  async DrawPoint(SeyyahnameKod: string) {
    let user_2 = await QW.json('/users/' + SeyyahnameKod);
    this.points.push(user_2.data);
    this.all_dialog_info = user_2.data;

    this.pushFeatureCollectionPoint(this.featureCollection);
    this.map.addSource(SeyyahnameKod + 'point', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: this.featureCollection,
      },
    });
    var location = [
      { point_type: 'YAPI', color: '#4C0035' },
      { point_type: 'YERLEŞİM YERİ', color: '#880030' },
      { point_type: 'YAKLAŞIK KONUM', color: '#B72F15' },
    ];
    location.forEach((c) => {
      this.map.addLayer({
        id: SeyyahnameKod + c.point_type,
        type: 'heatmap',
        source: SeyyahnameKod + 'point',
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
            'rgba(0, 0, 255, 0)',
            0.2,
            '#4C0035',
            0.4,
            '#880030',
            0.6,
            '#B72F15',
            0.8,
            '#D6610A',
            1,
            c.color,
          ],
        },
        filter: ['==', ['get', 'tespit_edilen_konum_olcegi'], c.point_type],
      });

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


        const description = e.features[0].properties;
        let id = description.Point_id.split(',')[1];
        let point = await QW.json('/users/' + SeyyahnameKod + '/' + id);

        this.point_info_dialog = await QW.json('/arazicalismasi/' + point.data[0]['yapi_envanter_kodu']);

        this.isDivVisible = true;

        let lokasyonId = await QW.json('/lokasyon/getId/' + point.data[0]['yapi_envanter_kodu']);
        this.dialogImgs = await QW.json('/galeri/filter/' + lokasyonId.Id);
        this.dialogImgs = this.dialogImgs.images;
        let filter = (element: any) => element.yapi_envanter_kodu == point.data[0]['yapi_envanter_kodu'];

        this.dialog_info_index = this.all_dialog_info.findIndex(filter);
        this.map.flyTo({ center: [parseFloat(this.point_info_dialog.Boylam), parseFloat(this.point_info_dialog.Enlem)], zoom: 11, speed: 0.3 });

        this.openDialog();
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
        DialogImgs: this.dialogImgs,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.gizle = false;

    });


    dialogRef.keydownEvents().subscribe(async (event: { shiftKey: any; key: string }) => {
      if (event.key === 'ArrowRight') {



        ++this.dialog_info_index;
        this.point_info_dialog = await QW.json('/arazicalismasi/' + this.all_dialog_info[this.dialog_info_index].yapi_envanter_kodu);
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
          DialogImgs: this.dialogImgs,
        };

        this.isDivVisible = true;

        let lokasyonId = await QW.json('/lokasyon/getId/' + this.all_dialog_info[this.dialog_info_index].yapi_envanter_kodu);
        this.dialogImgs = await QW.json('/galeri/filter/' + lokasyonId.Id);
        this.dialogImgs = this.dialogImgs.images;
        this.map.flyTo({ center: [parseFloat(this.point_info_dialog.Boylam), parseFloat(this.point_info_dialog.Enlem)], zoom: 11, speed: 1.2 });
      }
      if (event.key === 'ArrowLeft') {



        this.dialog_info_index = this.dialog_info_index - 1;

        this.point_info_dialog = await QW.json('/arazicalismasi/' + this.all_dialog_info[this.dialog_info_index].yapi_envanter_kodu);
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
          DialogImgs: this.dialogImgs,
        };

        this.isDivVisible = true;

        let lokasyonId = await QW.json('/lokasyon/getId/' + this.all_dialog_info[this.dialog_info_index].yapi_envanter_kodu);
        this.dialogImgs = await QW.json('/galeri/filter/' + lokasyonId.Id);
        this.dialogImgs = this.dialogImgs.images;
        this.map.flyTo({ center: [parseFloat(this.point_info_dialog.Boylam), parseFloat(this.point_info_dialog.Enlem)], zoom: 11, speed: 1.2 });
      }
    });
  }
  animateDashArray(timestamp: number): void {
    const newStep = Math.floor((timestamp / 50) % this.dashArraySequence.length);

    this.map.setPaintProperty(
      this.line_animation_kod+"dasharray",
      'line-dasharray',
      this.dashArraySequence[newStep]
    );

    requestAnimationFrame(this.animateDashArray.bind(this));
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
  styleUrls: ['mapbox-2.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatDialogTitle, MatDialogContent, LightgalleryModule, MySharedModules],
})
export class DialogContentExampleDialog {
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
