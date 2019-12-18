import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  responseError = "";
  blogNode = null;
  isFetching = false;
  constructor(private route: ActivatedRoute, private _dataService: DataService, private titleService: Title) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      var abc = paramMap.get('id');
      this.loadBlog(abc);
      this._dataService.postAPI("/userDisplay/increaseBlogViews", { id: abc }).subscribe(res => { })
    })
  }
  loadBlog(id) {
    this.isFetching = true;
    this._dataService.fetchWithQuery("/userDisplay/fetchSingleBlog", id).subscribe(res => {
      if (res.data) {
        this.blogNode = res.data['0'];
        this.titleService.setTitle(res.data['0']['title']);
        this.isFetching = false
      }
      else this.errorHandler(res.message)
    })
  }
  errorHandler(err) {
    this.isFetching = false;
    this.responseError = err;
    window.scrollTo(0, 0);
  }
  closeError() { this.responseError = "" }
}
