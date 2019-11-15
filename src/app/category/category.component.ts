import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  responseError = "";
  categoryArr = null;
  storeArr = null;
  constructor(private _dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this._dataService.fetchAPI("/userDisplay/fetchCategories").subscribe(res => {
      if (res.data) this.categoryArr = res.data;
      else console.log(res.message)
    })
    this.route.paramMap.subscribe(paramMap => {
      var abc = paramMap.get('id');
      if (abc) this.loadStores(abc)
    })
  }
  loadStores(id) {
    this._dataService.fetchWithQuery("/userDisplay/fetchStores", id).subscribe(res => {
      if (res.data) {
        this.storeArr = res.data;
        console.log(res.data)
      }
      else console.log(res.message)
    })
  }
  errorHandler(err) { this.responseError = "Can't load " + err + " at the moment" }
  closeError() { this.responseError = "" }
}
