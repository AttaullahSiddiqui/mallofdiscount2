import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  responseError = "";
  slideArray = [];
  storeArray = [];
  blogArray = [];
  dealsArray = [];
  constructor(private _dataService: DataService) { }

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
    // this._dataService.fetchOnlyLimit("/userDisplay/fetchTopDeals", 7).subscribe(res => {
    //   if (res.data) this.dealsArray = res.data;
    //   else this.errorHandler(res.message)
    // })
  }
  errorHandler(err) { this.responseError = "Can't load " + err + " at the moment" }
  closeError() { this.responseError = "" }
}
