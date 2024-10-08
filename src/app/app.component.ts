import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { LayoutAdminComponent } from "./_layoutadmin/layoutadmin.component";

import { LayoutHomeComponent } from "./_layouthome/layouthome.component";
import { AuthGuard } from './_lib/auth.guard';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, LayoutAdminComponent, LayoutHomeComponent],
    providers:[AuthGuard]
})
export class AppComponent {

 

}
