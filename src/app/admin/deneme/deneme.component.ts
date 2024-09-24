import { Component, inject, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MySharedModules } from '../../_com/myshared.module';
import { QW } from '../../_lib/qw.helper';
import { NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectComponent, NgSelectConfig, NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-deneme',
  standalone: true,
  imports: [CommonModule, MySharedModules, NgLabelTemplateDirective,
    NgOptionTemplateDirective,
    NgSelectComponent,NgSelectModule],
  templateUrl: './deneme.component.html',
  styleUrl: './deneme.component.scss'
})
export class DenemeComponent {

  selectedCar: number | undefined;

  cars = [
      { id: 1, name: 'Volvo' },
      { id: 2, name: 'Saab' },
      { id: 3, name: 'Opel' },
      { id: 4, name: 'Audi' },
  ];
}




