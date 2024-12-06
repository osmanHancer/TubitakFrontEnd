/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

// InMemoryScrolling için yapılandırma ekliyoruz
const scrollConfig = withInMemoryScrolling({
  scrollPositionRestoration: 'top', // Sayfa yönlendirmeden sonra en üste kaydırır
  anchorScrolling: 'enabled',          // Ankora (hash) kaydırmayı etkinleştirir
});

// appConfig'e ekliyoruz
const appConfiguration = {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideRouter(routes, scrollConfig),
  ],
};

bootstrapApplication(AppComponent, appConfiguration)
  .catch((err) => console.error(err));
