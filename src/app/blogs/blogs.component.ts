import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  responseError = "";
  blogsArr: {} = null;
  skipNo = 0;
  isFetching = false;
  constructor(private _dataService: DataService, private titleService: Title) { }

  ngOnInit() {
    this.fetchBlogs();
    this.titleService.setTitle("Blogs");
  }
  fetchBlogs() {
    this.isFetching = true;
    this._dataService.fetchAPIWithLimit("/userDisplay/fetchBlogsWithLimit", 6, "", this.skipNo).subscribe(res => {
      if (res.data) {
        this.blogsArr = { ...this.blogsArr, ...res.data };
        this.isFetching = false;
      }
      else {
        this.errorHandler(res.message);
        this.isFetching = false;
        if (this.skipNo) this.skipNo -= 6;
      }
    })
  }
  loadNext() {
    if (this.isFetching) return;
    this.skipNo += 6;
    this.fetchBlogs()
  }
  loadPrev() {
    if (!this.skipNo) {
      this.errorHandler("No more previous data exist");
      return;
    }
    if (this.isFetching) return;
    this.skipNo -= 6;
    this.fetchBlogs()
  }
  errorHandler(err) {
    this.responseError = err;
    window.scrollTo(0, 0);
  }
  closeError() { this.responseError = "" }
}
