import { Component } from '@angular/core';
import { QW } from '../../_lib/qw.helper';

@Component({
  selector: 'app-kaynakca',
  standalone: true,
  imports: [],
  templateUrl: './kaynakca.component.html',
  styleUrl: './kaynakca.component.scss'
})
export class KaynakcaComponent {

  kaynakca:any
  async ngOnInit(): Promise<void> {
    const json = await QW.json("/kaynakca");
    this.kaynakca = json.data[0];
    console.log(json.data[0].Seyahatnameler)        
  }
}
