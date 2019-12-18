import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  responseError = "";
  categoryArr = null;
  selectCat = null;
  selectedCat: any = null;
  storeArr = null;
  jug = 0;
  isLoading = false;
  constructor(private _dataService: DataService, private route: ActivatedRoute, private titleService: Title) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      var abc = paramMap.get('id');
      this._dataService.fetchAPI("/userDisplay/fetchCategories").subscribe(res => {
        if (res.data) {
          this.categoryArr = res.data;
          if (abc) {
            this.jug = 1;
            this.loadStores(abc);
          }
        }
        else console.log(res.message)
      })
    })
  }
  secondaryFunc(abc) {
    var xyz = Object.values(this.categoryArr);
    var xxx;
    xyz.forEach(function (val) {
      if (val["_id"] == abc) xxx = val["name"];
    });
    this.selectedCat = xxx;
    this.titleService.setTitle(xxx);
  }
  loadStores(id) {
    if (this.isLoading) return;
    if (!this.jug) {
      this.jug = 1;
      return;
    }
    this.isLoading = true;
    this.secondaryFunc(id)
    this._dataService.fetchWithQuery("/userDisplay/fetchStores", id).subscribe(res => {
      if (res.data) {
        this.storeArr = res.data;
        this.isLoading = false;
      }
      else this.errorHandler(res.message)
    })
  }
  errorHandler(err) {
    this.isLoading = false;
    this.responseError = err;
    window.scrollTo(0, 0);
  }
  closeError() { this.responseError = "" }
}
