import { BlogService } from './../blog.service';
import { Author } from './../models/author';
import { Blog } from './../models/blog';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { Category } from '../models/category';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss'],
  providers: [TitleCasePipe]
})
export class AddBlogComponent implements OnInit {

  constructor(private blogService: BlogService, private titleCasePipe: TitleCasePipe) { }

  ngOnInit(): void {
  }


  onFileSelect($event: any, property?: string) {
    const file = ($event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.blogForm.get(property).patchValue(reader.result.toString())
    };
    
    reader.readAsDataURL(file);
  }

  onCategorySelect($event: any) {
    this.blogForm.get('blogCategory').patchValue($event.target.value);
  }

  submit() {
    if (this.blogForm.valid) {
      const form = this.blogForm.value;
      const author = new Author(this.titleCasePipe.transform(form.firstName), this.titleCasePipe.transform(form.lastName), 
      this.titleCasePipe.transform(form.authorTitle), form.authorImageUrl);
      const blog = new Blog(form.blogCategory, form.blogImageUrl, this.date, 
        this.titleCasePipe.transform(form.blogTitle), form.blogDescription, form.blogBody, author);
      this.blogService.addBlog(blog);
    } else {
      this.blogForm.markAsDirty();
      this.blogForm.setErrors({'submitted': true})
      window.scrollTo(0, 0)
    }

  }

  reset() {
    this.blogForm.reset();
  }

  get date() : Date {
    let date = new Date();
    return date;
  }


  firstName = new FormControl(null, 
  {
    validators: [
      Validators.required,
      Validators.minLength(3), 
      Validators.maxLength(20)
    ], 
    updateOn: 'blur'
  });

  lastName = new FormControl(null, 
  {
    validators: [
      Validators.required,
      Validators.minLength(3), 
      Validators.maxLength(20)
    ], 
    updateOn: 'blur'
  });

  authorTitle = new FormControl(null, 
  {
    validators: [
      Validators.required,
      Validators.minLength(3), 
      Validators.maxLength(20)
    ], 
    updateOn: 'blur'
  });

  blogTitle = new FormControl(null, 
  {
    validators: [
      Validators.required,
      Validators.minLength(3), 
      Validators.maxLength(20)
    ], 
    updateOn: 'blur'
  });

  blogDescription = new FormControl(null, 
    {
      validators: [
        Validators.required,
        Validators.minLength(20), 
        Validators.maxLength(50)
      ], 
      updateOn: 'blur'
    });

  blogBody = new FormControl(null, 
  {
    validators: [
      Validators.required, Validators.minLength(100), Validators.maxLength(1000)
    ],
    updateOn: 'blur'
  });

  blogCategory = new FormControl(0);
  blogImageUrl = new FormControl(null, Validators.required);
  authorImageUrl = new FormControl(null, Validators.required);


  blogForm = new FormGroup ({
    firstName: this.firstName,
    lastName: this.lastName,
    authorTitle: this.authorTitle,
    authorImageUrl: this.authorImageUrl,
    blogTitle: this.blogTitle,
    blogDescription: this.blogDescription,
    blogBody: this.blogBody,
    blogCategory: this.blogCategory,
    blogImageUrl: this.blogImageUrl
  })

  get categories() : string[] {
    let categories = [];
    for (let item in Category) {
      if (isNaN(Number(item))) {
        categories.push(item)
      }

    }

    return categories;
  }

}
