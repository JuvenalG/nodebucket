/**
 * Title: main.ts
 * Author: Professor Krasso
 * Date: 21 March 2021
 * Modified By: Juvenal Gonzalez
 * Description: main typescript file for project
 */



import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
