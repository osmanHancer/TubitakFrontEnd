import { Injectable, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  setLightTheme(renderer: Renderer2): void {
    renderer.setAttribute(this.document.body, 'class', 'light-theme');
  }

  setDarkTheme(renderer: Renderer2): void {
    renderer.setAttribute(this.document.body, 'class', 'dark-theme');
  }
}
