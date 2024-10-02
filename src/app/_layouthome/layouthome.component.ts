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


  async ngAfterViewInit(): Promise<void> {
    await this.loadScript("/assets/js/meykurt.js");
  }

  public loadScript(url: string) {
    return new Promise<void>((resolve, reject) => {
      if (document.getElementById("script_omap")) return resolve();
      let node = document.createElement('script');
      node.src = url;
      node.type = 'text/javascript';
      // node.id = "script_omap";
      node.async = false;
      node.onload = () => {
        resolve();
      };
      node.onerror = (error: any) => {
        reject();
      };
      document.getElementsByTagName('head')[0].appendChild(node);
    });
  }
}
