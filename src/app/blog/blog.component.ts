import { BlogService } from './../blog.service';
import { Blog } from './../models/blog';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private blogService: BlogService) { }

  ngOnInit(): void {
    this.getBlog();
    console.log(this.blogId)
  }

  blog: Blog;

  get blogId() : string {
    return this.activatedRoute.snapshot.paramMap.get("id");
  }

  getBlog() : void {
    this.blog = this.blogService.getBlogById(this.blogId);
  }

  deleteBlog(id: string) : void {
    this.blogService.deleteBlog(id);
  }

}
