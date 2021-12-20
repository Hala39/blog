import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, ReplaySubject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  animations: [
    
  ]
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

}
