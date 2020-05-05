import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UploadFile, UploadChangeParam } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {

  loading = false;
  avatarUrl: string;
  imageUrl: string;
  audioUrl: string;
  validateForm: FormGroup;

  // readerChange(value: string): void {
  //   this.validateForm.get('reader').setValue(value);
  // }

  constructor(
    private fb: FormBuilder,
    private msg: NzMessageService
    ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      reader: [null, [Validators.required]],
      image: [null, [Validators.required]],
      audio: [null, [Validators.required]],
    });
  }
  
  submitForm(): void {
    console.log('this.validateForm', this.validateForm);
    // for (const i in this.validateForm.controls) {
    //   this.validateForm.controls[i].markAsDirty();
    //   this.validateForm.controls[i].updateValueAndValidity();
    // }
  }
  
  isValidImage(type: String) {
    return type === 'image/jpeg' || type === 'image/png' || type === 'image/gif' || type === 'image/jpg';
  }
  
  beforeUpload = (file: File) => {
    return new Observable((observer: Observer<boolean>) => {
      if (!this.isValidImage(file.type)) {
        this.msg.error('Please upload image!');
        observer.complete();
        return;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msg.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      observer.next(this.isValidImage(file.type) && isLt2M);
      observer.complete();
    });
  };

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  handleImageChange(info: { file: UploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
          // console.log('this.imageUrl', this.imageUrl);
        });
        break;
      case 'error':
        this.msg.error('Network error');
        this.loading = false;
        break;
    }
  }
  
  handleAudioChange(info: UploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      console.log('this.info.file', info.file);

      this.msg.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} file upload failed.`);
    }
  }

}
