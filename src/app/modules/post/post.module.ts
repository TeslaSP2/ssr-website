import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from '../../pages/post/post.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [

  { path: '', component: PostComponent }
 
];

@NgModule({
  exports: [RouterModule],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PostModule { }
