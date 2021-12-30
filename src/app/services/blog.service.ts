import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Blog } from '../models/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  private jsonFileUrl: string = "assets/json/blogs.json";
  private baseUrl = environment.apiUrl + 'blogs/';

  initialSetUp() {
    return this.httpClient.get<Blog[]>(this.jsonFileUrl).pipe(map(
      blogs => {
        blogs.forEach(blog => {
          this.addBlog(blog).subscribe();
        });
      }
    ))
  }

  getBlogs() {
    return this.httpClient.get<Blog[]>(this.baseUrl).pipe(
      map((blogs: Blog[]) => {
        if (blogs.length < 1) {
          this.initialSetUp().subscribe();
          window.location.reload();
        }
        return blogs;
      })
    );
  }

  getBlogById(id: string) {
    return this.httpClient.get<Blog>(this.baseUrl + id);
  }

  addBlog(blog: Blog) {
    return this.httpClient.post<Blog>(this.baseUrl, blog)
    .pipe(map(res => this.router.navigateByUrl('/')));
  }

  updateBlog(blog: Blog) {
    return this.httpClient.put<Blog>(this.baseUrl + blog._id, blog)
    .pipe(map(res => this.router.navigateByUrl('/blog/' + blog._id)));
  }

  deleteBlog(id: string) {
    return this.httpClient.delete<Blog>(this.baseUrl + id)
      .pipe(map(res => this.router.navigateByUrl('/')));
  }
  
}
