import { BlogService } from './services/blog.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Blog';

  constructor(private blogService: BlogService) {
    this.blogService.initialSetup();
  }

  ngOnInit() {
  
  }
}
