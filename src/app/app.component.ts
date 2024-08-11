import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { MySharedModules } from './_com/myshared.module';
import { LayoutAdminComponent } from "./_layoutadmin/layoutadmin.component";

import { LayoutHomeComponent } from "./_layouthome/layouthome.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, MySharedModules, LayoutAdminComponent, LayoutHomeComponent]
})
export class AppComponent {
  router: any;

  constructor(private _router: Router){
   this.router = _router.url; 
  }

}
