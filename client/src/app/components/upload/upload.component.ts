import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
fileData: File = null;
previewUrl:any = null;
fileUploadProgress: string = null;
uploadedFilePath: string = null;

  constructor(private apis: ApiService) {}

  fileProgress(fileInput: any) {
        this.fileData = <File>fileInput.target.files[0];
        this.preview();
  }

  ngOnInit() {
  }

  preview() {
    // Show preview
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }
}

onSubmit() {
    const formData = new FormData();
      formData.append('image', this.fileData);
      console.log("formdata",formData);

      this.apis.uploadImage(formData).subscribe(() => {
          console.log("success");
          // console.log(res);
          // this.uploadedFilePath = res.data.filePath;
          // alert('SUCCESS !!');
        })
}
}
