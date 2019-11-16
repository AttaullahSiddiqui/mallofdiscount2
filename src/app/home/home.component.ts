import { Component, OnInit, TemplateRef } from '@angular/core';
import { DataService } from '../data.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  modalRef: BsModalRef;
  codeCopied = false;
  editObj;
  responseError = "";
  slideArray: [] = null;
  storeArray: [] = null;
  blogArray: [] = null;
  dealsArray: [] = null;
  hiddenInput = null;
  constructor(private _dataService: DataService, private modalService: BsModalService) { }

  ngOnInit() {
    this._dataService.fetchAPI("/userDisplay/fetchSlides").subscribe(res => {
      if (res.data) this.slideArray = res.data;
      else this.errorHandler(res.message)
    })
    this._dataService.fetchOnlyLimit("/userDisplay/fetchTopStores", 10).subscribe(res => {
      if (res.data) this.storeArray = res.data;
      else this.errorHandler(res.message)
    })
    this._dataService.fetchOnlyLimit("/userDisplay/fetchTopBlogs", 5).subscribe(res => {
      if (res.data) this.blogArray = res.data;
      else this.errorHandler(res.message)
    })
    this._dataService.fetchOnlyLimit("/userDisplay/fetchTopDeals", 7).subscribe(res => {
      if (res.data) this.dealsArray = res.data;
      else this.errorHandler(res.message)
    })
  }
  openModal(template: TemplateRef<any>, couponNode) {
    this.editObj = { ...couponNode };
    window.open(this.editObj.trackingLink, '_blank');
    this.modalRef = this.modalService.show(template);
  }
  openModal2(template: TemplateRef<any>, couponNode) {
    this.codeCopied = false;
    this.editObj = { ...couponNode };
    this.modalRef = this.modalService.show(template);
    this.copyToClipBoard()
  }
  copyToClipBoard() {
    const el = document.createElement('textarea');
    el.value = this.editObj.code;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    this.codeCopied = true;
    document.body.removeChild(el);
    window.open(this.editObj.trackingLink, '_blank');
  }
  copyClipboardFunc() {
    this.copyToClipBoard();
    this.codeCopied = true;
  }
  errorHandler(err) { this.responseError = "Can't load " + err + " at the moment" }
  closeError() { this.responseError = "" }
}
