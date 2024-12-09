import { ChangeDetectorRef, Component, inject, Renderer2 } from '@angular/core';
import { MySharedModules } from '../_com/myshared.module';
import { MediaMatcher } from '@angular/cdk/layout';
import { ThemeService } from '../_lib/theme.service';
@Component({
  selector: 'app-layoutadmin',
  standalone: true,
  imports: [MySharedModules],
  templateUrl: './layoutadmin.component.html',
  styleUrl: './layoutadmin.component.scss'
})
export class LayoutAdminComponent {
isChecked: any;




  constructor( private themeService: ThemeService,
    private renderer: Renderer2) {


  }

  onToggleChange(event: any): void {
    if (event.checked) {
      // Toggle açık (true)
      this.switchToDark()
    } else {
      // Toggle kapalı (false)
      this.switchToLight()
    }
  }



  switchToLight() {
    this.themeService.setLightTheme(this.renderer);
  }

  switchToDark() {
    this.themeService.setDarkTheme(this.renderer);
  }

}
