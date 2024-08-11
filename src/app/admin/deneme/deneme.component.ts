import {  Component, inject, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { environment } from '../../../environments/environment';
import points from '../../../assets/19_james_morier_smooth_2.json';
import { MySharedModules } from '../../_com/myshared.module';
import { LayoutAdminComponent } from "../../_layoutadmin/layoutadmin.component";
import { LightgalleryModule } from 'lightgallery/angular';
@Component({
  selector: 'app-deneme',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MySharedModules, LayoutAdminComponent, LightgalleryModule],
  templateUrl: './deneme.component.html',
  styleUrl: './deneme.component.scss'
})
export class DenemeComponent implements OnInit  {

  
    constructor() {}
  
   
  
    map!: mapboxgl.Map;
    panelOpenState = false;
    visible = true;
    featureCollection: any = [];
    points: any[] = [];
    maps_data = points;
    router: any;
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

    isDivVisible: boolean = false;
    async ngOnInit() {
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
            id: element.name,
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
           
          });
          
     
        });
       
      
      });
    }
    animateDashArray(timestamp: number): void {
      const newStep = Math.floor((timestamp / 50) % this.dashArraySequence.length);
  
      this.map.setPaintProperty(
        'S14-JM-JourThroughPersia',
        'line-dasharray',
        this.dashArraySequence[newStep]
      );
  
      requestAnimationFrame(this.animateDashArray.bind(this));
    }
    updateAllComplete(data: any) {
      if (this.map.getLayoutProperty(data , 'visibility') == 'none') {
        this.map.setLayoutProperty(data , 'visibility', 'visible');
        this.animateDashArray(0);
        // this.DrawPoint(data);
      } else {
        this.map.setLayoutProperty(data , 'visibility', 'none');

      }
    }
  
    
  
 
  }
  
  