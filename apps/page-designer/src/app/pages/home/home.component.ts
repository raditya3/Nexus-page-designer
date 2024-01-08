import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'nexus-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

  constructor(private router: Router) { }

  // eslint-disable-next-line lodash-fp/prefer-constant
  private fetchPageId(): string {
    //TODO: This is hardcoded
    return "123"
  }

  navigateToNewPage() {
    const id = this.fetchPageId();
    this.router.navigate(["edit-page", id]);
  }
}
