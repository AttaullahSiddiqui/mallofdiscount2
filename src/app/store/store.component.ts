import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service'

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  responseError = "";
  switch = false;
  couponsArray: [] = null;
  storePic;
  storeDetail;
  storeName;
  storeId;
  storeArray: [] = null;
  constructor(private route: ActivatedRoute, private _dataService: DataService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      var abc = paramMap.get('id');
      this.loadCoupons(abc);
      this.loadStoreData(abc);
      this.secondTabData(abc);
    }
    )
  }
  loadCoupons(id) {
    this._dataService.fetchWithQuery("/userDisplay/fetchCoupons", id).subscribe(res => {
      if (res.data) {
        this.couponsArray = res.data;
        console.log(res.data)
      }
      else this.errorHandler(res.message)
    })
  }
  loadStoreData(id) {
    this._dataService.fetchWithQuery("/userDisplay/singleStoreData", id).subscribe(res => {
      if (res.data) {
        this.storePic = res.data['0']['img'];
        this.storeDetail = res.data['0']['shortDes'];
        this.storeName = res.data['0']['name'];
        this.storeId = res.data['0']['_id'];
        this.secondTabData(res.data['0']['categoryRef'][0])
      }
      else this.errorHandler(res.message)
    })
  }
  secondTabData(id) {
    this._dataService.fetchWithQuery("/userDisplay/fetchStores", id).subscribe(res => {
      if (res.data) {
        this.storeArray = res.data;
        console.log(res.data)
      }
      else console.log(res.message)
    })
  }
  loadAnotherStore(id) {
    this.couponsArray = null;
    this.loadStoreData = null;
    this.loadCoupons(id);
    this.switch = false;
    this.loadStoreData(id)
    this.secondTabData(id);
    this.storeArray = null;
  }
  errorHandler(err) { this.responseError = "Can't load " + err + " at the moment" }
  closeError() { this.responseError = "" }
}
