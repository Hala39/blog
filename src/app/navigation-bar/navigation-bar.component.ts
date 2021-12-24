import { toggle } from './../animations/toggle';
import { Component, HostListener, OnInit } from '@angular/core';
@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  animations: [toggle]
})
export class NavigationBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.displayNavigationBar = window.innerWidth > 768;
  }

  displayNavigationBar: boolean;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.displayNavigationBar = event.target.innerWidth > 768;
  }

  hi() {
    alert("hi")
  }

}
