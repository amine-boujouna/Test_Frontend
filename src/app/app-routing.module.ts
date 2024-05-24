import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { HomePageComponent } from './home-page/home-page.component';
import { EditbookComponent } from './editbook/editbook.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'Addbooks', component: AddBookComponent },
  { path: 'Editbooks/:id', component: EditbookComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
