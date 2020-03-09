import { Component, OnInit } from '@angular/core';
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
     const filtered = [];

     for (const img in this.images) {
       const desc = this.images[img].description.toLowerCase();
       if (desc.indexOf(value.toLowerCase()) >- 1) {
         filtered.push(this.images[img]);
       }
     }

     if (value === "") {
       this.loadImages();
     }

     this.images = filtered;
   }

   onDeleteClick(image){
     const {uid} = image;
     this.apis.deleteImage(uid).subscribe(() => {
        this.loadImages();
    });
   }
}
