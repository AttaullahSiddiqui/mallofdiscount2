import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent implements OnInit {
  responseError = "";
  storeArray: any = null;
  isLoading = false;
  constructor(private _dataService: DataService) { }

  ngOnInit() { this.loadStoreCallBack() };

  loadStoreCallBack() {
    this.isLoading = true;
    this._dataService.fetchOnlyLimit("/userDisplay/fetchRandomStores", 20).subscribe(res => {
      if (res.data) {
        this.storeArray = res.data;
        this.storeArray = Array.from(new Set(this.storeArray))
        console.log(res.data)
        console.log(typeof (res.data));
        this.isLoading = false;
      }
      else this.isLoading = false;
    })
  }
  loadMoreStores() {
    if (this.isLoading) return;
    this.loadStoreCallBack()
  };
  errorHandler(err) { this.responseError = "Can't load " + err + " at the moment" }
  closeError() { this.responseError = "" }
}
