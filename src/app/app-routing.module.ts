import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentComponent } from './content/content.component';
import { CreateBookComponent } from './create-book/create-book.component';

const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' }, 
  { path: 'home', component: ContentComponent },
  { path: 'create', component: CreateBookComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
