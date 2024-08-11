import { Component } from '@angular/core';
import { MySharedModules } from '../_com/myshared.module';

@Component({
  selector: 'app-layouthome',
  standalone: true,
  imports: [MySharedModules],
  templateUrl: './layouthome.component.html',
  styleUrl: './layouthome.component.scss'
})
export class LayoutHomeComponent {

}
