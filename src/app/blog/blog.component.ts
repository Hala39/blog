import { fade } from './../animations/fade';
import { BlogService } from '../services/blog.service';
import { Blog } from './../models/blog';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  animations: [fade]
})
export class BlogComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private blogService: BlogService) { }

  ngOnInit(): void {
    this.getBlog();
    window.scrollTo(0, 0);
  }

  blog: Blog;

  get blogId() : string {
    return this.activatedRoute.snapshot.paramMap.get("id");
  }

  getBlog() : void {
    this.blogService.getBlogById(this.blogId).subscribe(blog => this.blog = blog);
  }

  deleteBlog(id: string) : void {
    this.blogService.deleteBlog(id).subscribe();
  }

}
