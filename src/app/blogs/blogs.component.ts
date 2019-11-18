import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  blogsArr: {} = null;
  skipNo = 0;
  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this.fetchBlogs()
  }
  fetchBlogs() {
    this._dataService.fetchAPIWithLimit("/userDisplay/fetchSlides", 6, "", this.skipNo).subscribe(res => {
      if (res.data) this.blogsArr = { ...this.blogsArr, ...res.data };
      else console.log(res.message)
    })
  }
  loadMoreBlogs() {
    this.skipNo += 6;
    this.fetchBlogs()
  }
}
