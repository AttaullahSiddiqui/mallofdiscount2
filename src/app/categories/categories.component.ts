import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categoryArr = null;
  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this._dataService.fetchAPI("/userDisplay/fetchCategories").subscribe(res => {
      if (res.data) this.categoryArr = res.data;
      else console.log(res.message)
    })
  }

}
