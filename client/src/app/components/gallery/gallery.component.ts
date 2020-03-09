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

  constructor(private svcs: ApiService) {}

  ngOnInit() {
    //this.createForm();
    this.loadImages();
  }
  loadImages() {
    this.svcs.getImages().subscribe(images => {
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
     for (const img in this.images) {
     }
   }
   
   onDeleteClick(image){
     const params = image.uid;
     this.svcs.deleteImage(params).subscribe(() => {
        this.loadImages();
    });
   }
}
