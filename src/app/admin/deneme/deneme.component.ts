import { Component, inject, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { environment } from '../../../environments/environment';
import points from '../../../assets/19_james_morier_smooth_2.json';
import { MySharedModules } from '../../_com/myshared.module';
import { LayoutAdminComponent } from "../../_layoutadmin/layoutadmin.component";
import { LightgalleryModule } from 'lightgallery/angular';
declare var turf: any;
@Component({
  selector: 'app-deneme',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MySharedModules, LayoutAdminComponent, LightgalleryModule],
  templateUrl: './deneme.component.html',
  styleUrl: './deneme.component.scss'
})
export class DenemeComponent implements OnInit {


  constructor() { }



  map!: mapboxgl.Map;
  panelOpenState = false;
  visible = true;
  featureCollection: any = [];
  points: any[] = [];
  maps_data = points;
  router: any;


  isDivVisible: boolean = false;
  async ngOnInit() {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: 'mapbox://styles/mapbox/outdoors-v12',
      zoom: 15,
      center: [6.5615, 46.0598],
      interactive: false
    });



    this.map.on('load', () => {
      this.map.addSource('trace', {
        type: 'geojson',
        data: {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'LineString',
            'coordinates': this.getTargetRoute()
          }
        }
      });
 
      const animationDuration = 40000;
      const cameraAltitude = 40000;
      const routeDistance = turf.lineDistance(turf.lineString(this.getTargetRoute()));
      const cameraRouteDistance = turf.lineDistance(turf.lineString(this.getCameraRoute()));

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
          turf.lineString(this.getTargetRoute()),
          routeDistance * phase
        ).geometry.coordinates;

        const alongCamera = turf.along(
          turf.lineString(this.getCameraRoute()),
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

        window.requestAnimationFrame(frame);
      }

      window.requestAnimationFrame(frame);
    });
  }
  WatchLine(data:any){
    const animationDuration = 40000;
    const cameraAltitude = 40000;
    const routeDistance = turf.lineDistance(turf.lineString(this.getTargetRoute()));
    const cameraRouteDistance = turf.lineDistance(turf.lineString(this.getCameraRoute()));

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
        turf.lineString(this.getTargetRoute()),
        routeDistance * phase
      ).geometry.coordinates;

      const alongCamera = turf.along(
        turf.lineString(this.getCameraRoute()),
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

      window.requestAnimationFrame(frame);
    }
    window.requestAnimationFrame(frame);
  }

  private getTargetRoute(): any[] {
    // Burada hedef rotayı döndürmelisiniz
    return [[24.752320251772971, 42.149627671429627], [24.912818444875818, 42.147902505018521], [24.950440063905976, 42.137054206417027], [25.055214013060379, 42.137416656372132], [25.134776190011181, 42.107641716022663], [25.206824430629972, 42.069856708067135], [25.342910897039744, 42.05014304469362], [25.496144757162156, 41.990777508315894], [25.53475486950277, 41.977355307980226], [25.602109475918724, 41.932165602717028], [25.705337731404033, 41.913100099053402], [25.750754291810296, 41.931869872196991], [25.794302849278679, 41.927291798602113], [25.803296573103665, 41.942785491020587], [25.894180519124628, 41.943489660335203], [25.903399324816753, 41.931161510290558], [26.006482350068563, 41.881973025098461], [26.076659741083844, 41.865378414629483], [26.151578847708262, 41.787290684536657], [26.200152597598549, 41.76634702384434], [26.294778659104313, 41.724681154989206], [26.321806438076415, 41.725035052695652], [26.486343969713598, 41.684678159528012], [26.561268891077674, 41.678185930422501], [26.625188287947552, 41.624839126635372], [26.664076766242992, 41.602165148709858], [26.821661621511787, 41.549190605722963], [26.82350633143383, 41.54975284774347], [26.821661621511787, 41.549190605722963], [26.888145736682525, 41.510120788345723], [26.947658233168919, 41.505898061598472], [26.960049088138206, 41.492640481064825], [27.01669299656924, 41.474738442479044], [27.094402769186736, 41.428722822937509], [27.203440882177802, 41.420338971353729], [27.306107966209048, 41.403080835308387], [27.351650223280306, 41.407562373241269], [27.429131454832692, 41.352607690121175], [27.475154630432908, 41.335996120972283], [27.557465309871752, 41.286801042231524], [27.633323654271546, 41.274420971595276], [27.759660125796522, 41.199684812507385], [27.801625982783921, 41.159832360878816], [27.957587264518981, 41.097576483411487], [28.112560002922951, 41.072818245624006], [28.213629180142934, 41.081706891386894], [28.247594539053793, 41.073222319153047], [28.376182106838403, 41.054402227351098], [28.456195205470888, 41.031533789096891], [28.510941009798373, 41.008657404871073], [28.576795344160725, 41.021408858782905], [28.621274861596852, 41.024544625798072], [28.741220636525561, 40.976519034339134], [28.771935230952437, 40.987533979170792], [28.774616143680955, 41.007950694984991]];
  }

  private getCameraRoute(): any[] {
    // Burada kamera rotasını döndürmelisiniz
    return [[24.752320251772971, 42.149627671429627], [24.912818444875818, 42.147902505018521], [24.950440063905976, 42.137054206417027], [25.055214013060379, 42.137416656372132], [25.134776190011181, 42.107641716022663], [25.206824430629972, 42.069856708067135], [25.342910897039744, 42.05014304469362], [25.496144757162156, 41.990777508315894], [25.53475486950277, 41.977355307980226], [25.602109475918724, 41.932165602717028], [25.705337731404033, 41.913100099053402], [25.750754291810296, 41.931869872196991], [25.794302849278679, 41.927291798602113], [25.803296573103665, 41.942785491020587], [25.894180519124628, 41.943489660335203], [25.903399324816753, 41.931161510290558], [26.006482350068563, 41.881973025098461], [26.076659741083844, 41.865378414629483], [26.151578847708262, 41.787290684536657], [26.200152597598549, 41.76634702384434], [26.294778659104313, 41.724681154989206], [26.321806438076415, 41.725035052695652], [26.486343969713598, 41.684678159528012], [26.561268891077674, 41.678185930422501], [26.625188287947552, 41.624839126635372], [26.664076766242992, 41.602165148709858], [26.821661621511787, 41.549190605722963], [26.82350633143383, 41.54975284774347], [26.821661621511787, 41.549190605722963], [26.888145736682525, 41.510120788345723], [26.947658233168919, 41.505898061598472], [26.960049088138206, 41.492640481064825], [27.01669299656924, 41.474738442479044], [27.094402769186736, 41.428722822937509], [27.203440882177802, 41.420338971353729], [27.306107966209048, 41.403080835308387], [27.351650223280306, 41.407562373241269], [27.429131454832692, 41.352607690121175], [27.475154630432908, 41.335996120972283], [27.557465309871752, 41.286801042231524], [27.633323654271546, 41.274420971595276], [27.759660125796522, 41.199684812507385], [27.801625982783921, 41.159832360878816], [27.957587264518981, 41.097576483411487], [28.112560002922951, 41.072818245624006], [28.213629180142934, 41.081706891386894], [28.247594539053793, 41.073222319153047], [28.376182106838403, 41.054402227351098], [28.456195205470888, 41.031533789096891], [28.510941009798373, 41.008657404871073], [28.576795344160725, 41.021408858782905], [28.621274861596852, 41.024544625798072], [28.741220636525561, 40.976519034339134], [28.771935230952437, 40.987533979170792], [28.774616143680955, 41.007950694984991]];
  }

}




