import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../services/blog.service';
import { Author } from './../models/author';
import { Blog } from './../models/blog';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { Category } from '../models/category';
import { fade } from '../animations/fade';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss'],
  providers: [TitleCasePipe],
  animations: [fade]
})
export class AddBlogComponent implements OnInit {

  constructor(private blogService: BlogService, private titleCasePipe: TitleCasePipe,
    private activatedRoute: ActivatedRoute, private router: Router) { 
      this.setBlog();
    }

  ngOnInit(): void {
  }

  onFileSelect($event: any, property: string) {
    const file = ($event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (property === 'authorImageUrl') 
        this.authorImageUrl.patchValue(reader.result.toString());
      else {
        this.blogImageUrl.patchValue(reader.result.toString());
        this.blogImageUrl.markAsDirty();
      }
    };
    
    reader.readAsDataURL(file);
  }

  onCategorySelect($event: any) {
    this.blogCategory.patchValue($event.target.value);
    this.blogCategory.markAsDirty();
  }

  submit() : void {
    if (this.form.valid) {
      this.blogService
        .addBlog(this.createBlogObject(this.createAuthorObject()))
        .subscribe();
    } else {
      this.markFormInvalid();
    }

  }

  editBlog() {
    if (this.form.get('blogForm').valid) {
      const author: Author = this.blog?.author;
      this.blogService.updateBlog(this.createBlogObject(author, this.blogId))
        .subscribe();
    } else {
      this.markFormInvalid();
    }
  }

  cancel() {
    this.router.navigateByUrl('/blog/' + this.blogId)
  }

  reset() {
    this.form.reset();
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
      Validators.maxLength(200)
    ], 
    updateOn: 'blur'
  });

  authorTitle = new FormControl(null, 
  {
    validators: [
      Validators.required,
      Validators.minLength(3), 
      Validators.maxLength(50)
    ], 
    updateOn: 'blur'
  });

  blogTitle = new FormControl(null, 
  {
    validators: [
      Validators.required,
      Validators.minLength(3), 
      Validators.maxLength(200)
    ], 
    updateOn: this.isEditMode? 'change' : 'blur'
  });

  blogDescription = new FormControl(null, 
    {
      validators: [
        Validators.required,
        Validators.minLength(20), 
        Validators.maxLength(400)
      ], 
      updateOn: this.isEditMode? 'change' : 'blur'
    });

  blogBody = new FormControl(null, 
  {
    validators: [
      Validators.required, Validators.minLength(100), Validators.maxLength(5000)
    ],
    updateOn: this.isEditMode? 'change' : 'blur'
  });

  blogCategory = new FormControl('');
  blogImageUrl = new FormControl(null, Validators.required);
  authorImageUrl = new FormControl(null, Validators.required);


  form = new FormGroup ({
    authorForm: new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      authorTitle: this.authorTitle,
      authorImageUrl: this.authorImageUrl,
    }),

    blogForm: new FormGroup({
      blogTitle: this.blogTitle,
      blogDescription: this.blogDescription,
      blogBody: this.blogBody,
      blogCategory: this.blogCategory,
      blogImageUrl: this.blogImageUrl
    })
  })

  blog: Blog;

  setBlog() {
    if (this.blogId)
      this.blogService.getBlogById(this.blogId).subscribe(res => {
        this.blogBody.patchValue(res.body);
        this.blogCategory.patchValue(res.category);
        this.blogDescription.patchValue(res.description);
        this.blogImageUrl.patchValue(res.imageUrl);
        this.blogTitle.patchValue(res.title)
      });

  }

  get isEditMode() : boolean {
    return this.router.url.includes('edit');
  }

  get blogId() : string {
    return this.activatedRoute.snapshot.paramMap.get("id") || null;
  }

  get categories() : string[] {
    let categories = [(this.blogCategory.value || 'Design ')];
    for (let item in Category) {
      if (isNaN(Number(item))) {
        categories.push(item)
      }

    }

    return categories;
  }

  private createBlogObject(author: Author, id?: string) : Blog {
    const blog = new Blog(this.blogCategory.value, this.blogImageUrl.value,
      this.titleCasePipe.transform(this.blogTitle.value), 
      this.blogDescription.value, this.blogBody.value, author, id? id : null);
    return blog;
  }

  private createAuthorObject() : Author {
    const author = new Author(this.titleCasePipe.transform(this.firstName.value), 
      this.titleCasePipe.transform(this.lastName.value), 
      this.titleCasePipe.transform(this.authorTitle.value), 
      this.authorImageUrl.value);
    return author;
  }

  private markFormInvalid() : void {
    this.form.markAsDirty();
    this.form.setErrors({'submitted': true})
    window.scrollTo(0, 0)
  }

}
