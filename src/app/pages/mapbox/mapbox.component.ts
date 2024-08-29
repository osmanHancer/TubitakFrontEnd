import { Component } from '@angular/core';
import 'mapbox-gl/dist/mapbox-gl.css';
import * as mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-mapbox',
  standalone: true,
  imports: [],
  templateUrl: './mapbox.component.html',
  styleUrl: './mapbox.component.scss'
})
export class MapboxComponent {

 

  map!: mapboxgl.Map;


  async ngOnInit() {


    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v11',
      zoom: 6,
      center: [27.422222, 38.630554],
    });

  }
  
}
