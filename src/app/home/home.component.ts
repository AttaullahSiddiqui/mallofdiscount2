import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  slides: any[] = [];
  constructor() {
    for (let i = 0; i < 4; i++) {
      this.addSlide();
    }
  }

  ngOnInit() {
  }
  addSlide(): void {
    this.slides.push({
      image: `https://lorempixel.com/900/500/abstract/${this.slides.length % 8 + 1}/`
    });
  }
}
