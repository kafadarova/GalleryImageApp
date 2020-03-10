import { Component, OnInit } from '@angular/core';
//import * as $ from 'jquery';
import { ApiService } from '../../api.service';
import { ModalService } from '../../_modal';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
 images: {};
 imageDesc: string;
 currentImage: {};

  constructor(private apis: ApiService, private modalService: ModalService) {}

  ngOnInit() {
    //this.createForm();
    this.loadImages();
    // this.imageDesc = 'This text can be updated in modal 1';
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

   updateImage(id) {
     this.closeModal(id);
     this.apis.updateImage(this.currentImage, this.imageDesc).subscribe(() => {
        this.loadImages();
    });;
   }

   openModal(id: string) {
      this.modalService.open(id);
   }

   closeModal(id: string) {
      this.modalService.close(id);
    }

   oneEditClick(image) {
     this.openModal('custom-modal-1');
     this.currentImage = image;
     this.imageDesc = image.description;
   }

   onDeleteClick(image){
     const {uid} = image;
     this.apis.deleteImage(uid).subscribe(() => {
        this.loadImages();
    });
   }
}
