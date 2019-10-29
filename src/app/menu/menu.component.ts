import { Component, AfterViewInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from "@angular/router";
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements AfterViewInit {
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  constructor(private router: Router, @Inject(DOCUMENT) _document?: any) {
    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }
  ngOnDestroy(): void { this.changes.disconnect() }
  ngAfterViewInit() {
    for (var i = 0; i < 3; i++) {
      (<HTMLElement>document.getElementsByClassName('navbar-toggler')[i]).classList.remove('d-lg-block');
      (<HTMLElement>document.getElementsByClassName('navbar-toggler')[i]).classList.remove('d-md-block');
      (<HTMLElement>document.getElementsByClassName('navbar-toggler')[i]).classList.remove('d-lg-none');
      (<HTMLElement>document.getElementsByClassName('navbar-toggler')[i]).classList.add('d-none');
    }

  }
}
