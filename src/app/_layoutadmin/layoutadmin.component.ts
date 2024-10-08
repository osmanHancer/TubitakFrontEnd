import { Component } from '@angular/core';
import { MySharedModules } from '../_com/myshared.module';
@Component({
  selector: 'app-layoutadmin',
  standalone: true,
  imports: [MySharedModules],
  templateUrl: './layoutadmin.component.html',
  styleUrl: './layoutadmin.component.scss'
})
export class LayoutAdminComponent {
  title = 'Admin';
opened: boolean=true;;
}
