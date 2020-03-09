import { Component, OnInit } from '@angular/core';
import {FormGroup,
        FormBuilder} from '@angular/forms';
//import * as $ from 'jquery';
import { CommonServicesService } from '../../common-services.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
 title = 'app';
 imageNm: string;
 images = [];

  constructor(private svcs: CommonServicesService) { }

  ngOnInit() {
    //this.createForm();
    this.loadImages();
  }

  // createForm() {
  //   this.myForm = this.fb.group({
  //     imageName: '',
  //     imageAvatar: null
  //   });
  // }

  loadImages() {
    this.svcs.getImages().subscribe(images => {
      console.log(images);

    },
    err => {
      console.log(err);
      return err;
    }
    );
   }

}
