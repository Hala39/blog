import { AddBlogComponent } from './add-blog/add-blog.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog/blog.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'blog/:id', component: BlogComponent, pathMatch: 'full' },
  { path: 'add-blog', component: AddBlogComponent, pathMatch: 'full' },
  { path: 'edit-blog/:id', component: AddBlogComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
