import { Component } from '@angular/core';
import { QW } from '../../_lib/qw.helper';

@Component({
  selector: 'app-english-summary',
  standalone: true,
  imports: [],
  templateUrl: './english-summary.component.html',
  styleUrl: './english-summary.component.scss'
})
export class EnglishSummaryComponent {

  hakkindaText:string="";
  async ngOnInit(): Promise<void> {
    const jsonhomeText = await QW.json("/editor");
    this.hakkindaText=jsonhomeText.editor[0].hakkinda;
  
  }
}
