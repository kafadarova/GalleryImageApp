import { Component, OnInit } from '@angular/core';
import {FormGroup,
        FormBuilder} from '@angular/forms';
//import * as $ from 'jquery';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
 images: {};

  constructor(private apis: ApiService) {}

  ngOnInit() {
    //this.createForm();
    this.loadImages();
  }
  loadImages() {
    this.apis.getImages().subscribe(images => {
      this.images = images;
    },
    err => {
      console.log(err);
      return err;
    }
    );
   }

   onKey(event: any) {
  const value = event.target.value;
  // const filtered = [];

  // for (const img in this.images) {
  //   console.log(this.images[img].description);
  //   if (this.images[img].description.indexOf(value) >- 1) {
  //     filtered.push(img);
  //   }
  // }

  // const filtered = this.images.filter(img => {
  //   return img.description.indexOf(value) >- 1;
  //   });
  //
  //   if (value=== "") {
  //   this.loadImages();
  //   }
  //
  //   this.images = filtered;
  }

   onDeleteClick(image){
     const {uid} = image;
     this.apis.deleteImage(uid).subscribe(() => {
        this.loadImages();
    });
   }
}
