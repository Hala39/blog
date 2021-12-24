import { BlogService } from './../blog.service';
import { Component, OnInit } from '@angular/core';
import { Blog } from '../models/blog';
import { fade } from '../animations/fade';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fade]
})
export class HomeComponent implements OnInit {

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.blogs = this.blogService.getBlogs();
  }

  blogs: Blog[];

}
