import { Component } from '@angular/core';
import { QW } from '../../_lib/qw.helper';

@Component({
  selector: 'app-proje-ciktilari',
  standalone: true,
  imports: [],
  templateUrl: './proje-ciktilari.component.html',
  styleUrl: './proje-ciktilari.component.scss'
})
export class ProjeCiktilariComponent {
  ciktilar:any
  async ngOnInit(): Promise<void> {
    const json = await QW.json("/ciktilar");
    this.ciktilar = json.data[0].ciktilar;
  }
}
