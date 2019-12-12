import { Component, AfterViewInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from "@angular/router";
import { DataService } from '../data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements AfterViewInit {
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  switch = false;
  mouseLoc = false;
  noResult = false;
  storeArray = null;
  blogArray = null;
  searchBox = null;
  constructor(private _dataService: DataService, private router: Router, @Inject(DOCUMENT) _document?: any) {
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
    this._dataService.fetchOnlyLimit("/userDisplay/fetchTopBlogs", 4).subscribe(res => {
      if (res.data) this.blogArray = res.data;
      else console.log(res.message)
    });
  }
  searchFunc(queri) {
    if (!queri) return;
    this.noResult = false;
    this.storeArray = null;
    this._dataService.fetchAPIWithLimit("/userDisplay/searchQuery", 10, queri, "").subscribe(res => {
      if (res.data) this.storeArray = res.data;
      else this.noResult = true;
    })
  }
  focusOutFunc() {
    setTimeout(() => {
      this.switch = false
    }, 300);
  }
  openNav(e) {
    e.preventDefault();
    document.getElementById("mySidenav").style.width = "250px";
  }
  closeNav(e) {
    e.preventDefault();
    document.getElementById("mySidenav").style.width = "0";
  }
}
