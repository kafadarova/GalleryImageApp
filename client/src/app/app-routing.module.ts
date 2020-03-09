import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadComponent } from './components/upload/upload.component';
import { GalleryComponent } from './components/gallery/gallery.component';

const routes: Routes = [
  {path:'', component: GalleryComponent},
  {path:'upload', component: UploadComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
