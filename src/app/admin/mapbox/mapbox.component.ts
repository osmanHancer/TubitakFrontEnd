import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { environment } from '../../../environments/environment';
import points from '../../../assets/19_james_morier_smooth.json';
import { MySharedModules } from '../../_com/myshared.module';
import { QW } from '../../_lib/qw.helper';

@Component({
  selector: 'app-mapbox',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MySharedModules],
  templateUrl: './mapbox.component.html',
  styleUrl: './mapbox.component.scss'
})
export class MapboxComponent implements OnInit {


  map!: mapboxgl.Map;
  style = 'mapbox://styles/osman157/clube38z0003y01ntcalqdh8v';
  panelOpenState = false;
  featureCollection: any = []
  longLat: any[] = []
  seyyahs: any[] = []
  info_elements: any
  info_elements_2: any
  info_elements_3: any
  maps_data = points
  seyyah_kod: any = []


  async ngOnInit() {


    // console.log(points.features[0].geometry.coordinates)
    let user_1 = await QW.json("/users/S36-CLB-CorBruLev");
    let user_2 = await QW.json("/users/S14-JM-JourThroughPersia");
    //  let user_3=  await QW.json("/users/S32-BC-YolGün");
    //  let user_4=  await QW.json("/users/S36-CLB-CorBruLev");
    this.seyyahs.push(user_1.data)
    this.seyyahs.push(user_2.data)
    //  this.seyyahs.push(user_3.data)
    //  this.seyyahs.push(user_4.data)
    this.pushFeatureCollectionLine(this.featureCollection)
    this.pushFeatureCollectionPoint(this.featureCollection)
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: this.style,
      zoom: 6,
      center: [27.422222, 38.630554],
    });


    this.map.on('load', () => {

      this.map.loadImage(
        '../../assets/icons/castle.png',
        (error, image) => {
          if (error) throw error;

          // Add the image to the map style.
          this.map.addImage('cat', image!);
          this.featureCollection.forEach((element: any) => {
            if (element.geometry.type != "Point") {
              this.map.addSource("_" + element.properties.Seyahname_Kodu, {
                'type': 'geojson',
                'data': {
                  'type': 'FeatureCollection',
                  'features': [element]
                }
              });
            }
            if (element.geometry.type == "Point") {
              this.map.addSource(element.properties.Point_id, {
                'type': 'geojson',
                'data': {
                  'type': 'FeatureCollection',
                  'features': [element]
                }
              });
            }
          });

          this.featureCollection.forEach((element: any) => {

            if (element.geometry.type == "Point") {
              this.map.addLayer({
                'maxzoom': 8,
                'minzoom': 4,
                'id': element.properties.Point_id,
                'type': 'circle',
                'source': element.properties.Point_id,
                paint: {
                  'circle-radius': 9,
                  'circle-color':

                    'black'

                }
              });
            }
            if (element.geometry.type != "Point") {
              this.map.addLayer({
                'maxzoom': 10,
                'minzoom': 4,
                'id': "_" + element.properties.Seyahname_Kodu,
                'type': 'line',
                'source': "_" + element.properties.Seyahname_Kodu,
                'layout': {
                  'visibility': 'none',
                  'line-join': 'round',
                  'line-cap': 'round'
                },
                'paint': {
                  'line-color': element.properties.color,
                  'line-width': 4,
                  'line-dasharray': element.properties.tür == "kara" ? [1, 0] : [4, 3],
                }
              });
            }
          }
          );

        });
    });

    this.featureCollection.forEach((element: any) => {
      if (element.geometry.type == "LineString" || element.geometry.type == "MultiLineString") {
        this.map.on('mouseenter', "_" + element.properties.Seyahname_Kodu, () => {
          this.map.getCanvas().style.cursor = 'pointer';
          // this.map.setPaintProperty(element.properties.Point_id, 'circle-color', '#eee');

        });
        this.map.on('mouseleave', "_" + element.properties.Seyahname_Kodu, () => {
          // this.map.setPaintProperty(element.properties.Point_id, 'circle-color', 'black');
          this.map.getCanvas().style.cursor = '';
        });
      }
      if (element.geometry.type == "LineString" || element.geometry.type == "MultiLineString") {
        this.map.on('click', "_" + element.properties.Seyahname_Kodu, (e) => {

          this.info_elements = "_" + element.properties.Seyahname_Kodu
          // this.info_elements_2 = element.properties.Seyahatname_Adı
          // this.info_elements_3 = element.properties.Yıl_Ya_Da_Yüzyıl

        });
      }
    });


  }

  updateAllComplete(data: any) {

    let layer = this.seyyah_kod[data].split(" ")
    layer.forEach((element: string) => {
      if (element != "undefined") {
        if (this.map.getLayoutProperty("_" + element, 'visibility') == 'none')
          this.map.setLayoutProperty("_" + element, 'visibility', 'visible')
        else
          this.map.setLayoutProperty("_" + element, 'visibility', 'none')
      }
    });
    // this.map.setLayoutProperty(element,'visibility', 'visible')

  }
  pushFeatureCollectionLine(featureCollection: any) {


    // this.seyyahs.forEach((element: any) => {

    //   element.forEach((point: any) => {

    //     if (point.boylam != 0 || point.enlem != 0) {
    //       let data = [point.boylam, point.enlem]
    //       this.longLat.push(data)
    //     }
    //   });
    //   //  console.log(this.longLat)
    //   featureCollection.push({
    //     "type": "Feature",
    //     "geometry": {
    //       "type": "LineString",
    //       "coordinates":this.longLat,
    //     },
    //     "properties": {
    //       'Seyahname_Kodu': element[0]["seyahname_kodu"],
    //       'color': element[0]["color"],
    //       'Seyahatname_Adı': element[0]["seyahatname_adi"],
    //       'Yıl_Ya_Da_Yüzyıl': element[0]["yuzyil"],

    //     }
    //   });
    //   this.longLat = [];
    // });

    points.forEach(type => {
      type.features.forEach(element => {
        featureCollection.push(element)
        this.seyyah_kod[type.name] += " " + element.properties.Seyahname_Kodu
      })

    });
  }
  pushFeatureCollectionPoint(featureCollection: any) {
    this.seyyahs.forEach((element: any) => {
      element.forEach((point: any) => {
        if (point.boylam != 0 || point.enlem != 0) {
          let data = [point.boylam, point.enlem]
          featureCollection.push({
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": data,
            },
            "properties": {
              'Point_id': point["seyahname_kodu"] + point["id"],
              'Seyahname_Kodu': element[0]["seyahname_kodu"],
              'color': element[0]["color"],
              'Seyahatname_Adı': element[0]["seyahatname_adi"],
              'Yıl_Ya_Da_Yüzyıl': element[0]["yuzyil"],

            }
          });
        }
      });
      //  console.log(this.longLat)

    });

  }
}
