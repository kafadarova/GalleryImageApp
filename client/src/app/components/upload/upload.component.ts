import { Component, OnInit } from '@angular/core';
import {FormGroup,
        FormsModule,
        ReactiveFormsModule,
        FormBuilder} from '@angular/forms';
import { ApiService } from '../../api.service';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  myForm: FormGroup;
  imageNm: string;

  constructor(private fb: FormBuilder,private apis: ApiService) {}

  ngOnInit() {
   this.createForm();
 }
 createForm() {
   this.myForm = this.fb.group({
     imageName: '',
     imageAvatar: null
   });
 }
 onUploadBtnClick() {
    $('#imageFile').click();
  }
  onFileChange(event) {
    const reader = new FileReader();
    $('#upload-btn').attr('style', 'visibility: visible');
    if (event.target.files &&
      event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        $('#preview')
        .attr('src', URL.createObjectURL(event.target.files[0]));
        this.myForm.get('imageAvatar').setValue({
          filename: file.name,
          filetype: file.type,
          //value: reader.result.split(',')[1]
        });
      };
    }
  }
  onSubmit() {
    const formModel = this.myForm.value;
    const params = {
      imageName: this.myForm.get('imageNm'),
      imageAvatar: this.myForm.get('imageAvatar'),
      maintDt: Date.now()
    };
    this.apis.uploadImage(formModel).subscribe(data => {
      console.log(data);
    });
  }
}
