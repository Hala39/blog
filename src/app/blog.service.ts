import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Blog } from './models/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  private jsonFileUrl: string = "assets/json/blogs.json";

  initialSetup() {
    return this.httpClient.get<Blog[]>(this.jsonFileUrl)
      .pipe(map((blogs: Blog[]) => this.setBlogs(blogs)));
  }

  getBlogs() : Blog[] {
    let blogs: Blog[] =  JSON.parse(localStorage.getItem('blogs'));
    if (!blogs || blogs.length < 1)
      this.initialSetup().subscribe();
    return blogs;
  }

  getBlogById(id: string) : Blog {
    const blogs = this.getBlogs();
    return blogs.find(b => b.id === id);
  }

  setBlogs(blogs: Blog[]) : void {
    localStorage.setItem('blogs', JSON.stringify(blogs));
  }

  addBlog(blog: Blog) : void {
    let blogs = this.getBlogs();
    blogs = [blog, ...blogs];
    this.setBlogs(blogs);
  }

  editBlog(blog: Blog) : void {
    let blogs = this.getBlogs();
    let index = blogs.findIndex(b => b.id == blog.id);
    blogs[index] = blog;
    this.setBlogs(blogs);
    this.router.navigateByUrl('/blog/' + blog.id)

  }

  deleteBlog(id: string) : void {
    let blogs = this.getBlogs();
    blogs = blogs.filter(b => b.id !== id);
    this.setBlogs(blogs);
    this.router.navigateByUrl('/');
  }
  
}
