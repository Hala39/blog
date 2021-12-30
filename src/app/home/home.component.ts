import { BlogService } from '../services/blog.service';
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
    this.blogService.getBlogs().subscribe(blogs => this.blogs = blogs);
  }

  blogs: Blog[];

}
