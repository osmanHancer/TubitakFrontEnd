import { Component } from '@angular/core';
import { QW } from '../../_lib/qw.helper';

@Component({
  selector: 'app-hakkinda',
  standalone: true,
  imports: [],
  templateUrl: './hakkinda.component.html',
  styleUrl: './hakkinda.component.scss'
})
export class HakkindaComponent {

  hakkindaText:string="";
  async ngOnInit(): Promise<void> {
    const jsonhomeText = await QW.json("/editor");
    this.hakkindaText=jsonhomeText.editor[0].hakkinda;
  
  }
}
