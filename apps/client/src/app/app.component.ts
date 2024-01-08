import { Component } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-var-requires

import * as _config from 'client-config';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'client';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config;
  constructor() {
    this.config = _config["homePage"];
  }
}
