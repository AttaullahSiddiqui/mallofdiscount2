import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent implements OnInit {
  responseError = "";
  storeArray: any = null;
  isLoading = false;
  constructor(private _dataService: DataService, private titleService: Title) { }

  ngOnInit() {
    this.loadStoreCallBack();
    this.titleService.setTitle("Stores");
  };

  loadStoreCallBack() {
    this.isLoading = true;
    this._dataService.fetchOnlyLimit("/userDisplay/fetchRandomStores", 20).subscribe(res => {
      if (res.data) {
        this.storeArray = res.data;
        this.storeArray = Array.from(new Set(this.storeArray));
        this.isLoading = false;
      }
      else this.errorHandler(res.message)
    })
  }
  loadMoreStores() {
    if (this.isLoading) return;
    this.loadStoreCallBack()
  };
  errorHandler(err) {
    this.isLoading = false;
    this.responseError = err;
    window.scrollTo(0, 0);
  }
  closeError() { this.responseError = "" }
}
