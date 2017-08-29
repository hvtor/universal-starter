import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: `
    <h1>
      Welcome to {{title}}!!
    </h1>
  `,
  styles: []
})
export class AppComponent {
  title;
  constructor(private metaService: Meta){}
  ngOnInit(){
    this.title = 'before async';
    setTimeout(() => this.title = 'after async', 2000)
    this.metaService.addTag({
      name: 'author',
      value: 'Toxicable'
    });
  }
}
