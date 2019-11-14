import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  modalRef: BsModalRef;
  responseError = "";
  switch = false;
  couponsArray: {} = null;
  storePic;
  storeDetail;
  storeName;
  storeId;
  codeCopied = false;
  editObj;
  storeArray: [] = null;
  currentDate = Date.now();
  constructor(private route: ActivatedRoute, private _dataService: DataService, private modalService: BsModalService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      var abc = paramMap.get('id');
      this.loadCoupons(abc);
      this.loadStoreData(abc);
    }
    )
  }
  openModal(template: TemplateRef<any>, couponNode) {
    this.editObj = { ...couponNode };
    window.open(this.editObj.trackingLink, '_blank');
    this.modalRef = this.modalService.show(template);
  }
  openModal2(template: TemplateRef<any>, couponNode) {
    this.codeCopied = false;
    this.editObj = { ...couponNode };
    window.open(this.editObj.trackingLink, '_blank');
    this.modalRef = this.modalService.show(template);
  }
  closeModal() { this.modalRef.hide() }
  copyToClipBoard() {
    window.open(this.editObj.trackingLink, '_blank');
    const el = document.createElement('textarea');
    el.value = this.editObj.code;
    // el.setAttribute('readonly', '');
    // el.style.position = 'absolute';
    // el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    this.codeCopied = true;
    document.body.removeChild(el);
  }
  loadCoupons(id) {
    this._dataService.fetchWithQuery("/userDisplay/fetchCoupons", id).subscribe(res => {
      if (res.data) {
        this.couponsArray = res.data;
        console.log(res.data)
        for (var i = 0; i < res.data.length; i++) {
          var orginalDate = this.couponsArray[i]['expDate'];
          var singleObj: Object = this.couponsArray[i];
          var fff = new Date(orginalDate).getTime();
          singleObj['expDate'] = fff;
          this.couponsArray[i] = singleObj;
        }
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
    console.log(id)
    this._dataService.fetchWithQuery("/userDisplay/fetchStores", id).subscribe(res => {
      if (res.data) {
        this.storeArray = res.data;
        console.log(res.data)
      }
      else console.log(res.message)
    })
  }
  loadAnotherStore(id) {
    this.switch = false;
    this.couponsArray = null;
    this.storeDetail = null;
    this.storeArray = null;
    this.loadCoupons(id);
    this.loadStoreData(id)
    this.secondTabData(id);
  }
  errorHandler(err) { this.responseError = "Can't load " + err + " at the moment" }
  closeError() { this.responseError = "" }
}
