import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Blog } from './models/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private httpClient: HttpClient) { }

  private jsonFileUrl: string = "assets/json/blogs.json";

  initialSetup() {
    return this.httpClient.get<Blog[]>(this.jsonFileUrl).pipe(map((blogs: Blog[]) => this.setBlogs(blogs)));
  }

  getBlogs() : Blog[] {
    let blogs: Blog[] =  JSON.parse(localStorage.getItem('blogs'));
      this.initialSetup().subscribe();
    return blogs;
  }

  getBlogById(id: number) : Blog {
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
    let index = blogs.indexOf(blog);
    blogs[index] = blog;
    this.setBlogs(blogs);
  }

  deleteBlog(id: number) : void {
    let blogs = this.getBlogs();
    blogs = blogs.filter(b => b.id !== id);
    this.setBlogs(blogs);
  }
}
