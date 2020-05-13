import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AudiosBookService } from '../services/audiosBook.service';
import { ImageService } from  '../services/image.service';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {

  imageObj: File;
  audioObj: File;
  imageUrl: string;
  audioUrl: string;
  submitted = false;
  title: string = '';
  reader: string = '';

  
  uploadForm: FormGroup;


  constructor(
    private audiosBookService: AudiosBookService,
    private fb: FormBuilder,
    private imageService: ImageService,
    ) {
      this.uploadForm = this.fb.group({
        title: ['', [Validators.required]],
        reader: ['', [Validators.required]],
        image: ['', [Validators.required]],
        audio: ['', [Validators.required]]
      });
    }

  ngOnInit() {
  }

  audioFileChange(element: Event) {
    const FILE = (event.target as HTMLInputElement).files[0];
    this.audioObj = FILE;
    this.onAudioUpload()
    .then(data => {
      this.audioUrl = data;
    });
  }
  
  imageFileChange(element) {
    const FILE = (event.target as HTMLInputElement).files[0];
    this.imageObj = FILE;
    this.onImageUpload()
    .then(data => {
      this.imageUrl = data;
    });
  }
  
  async onImageUpload(): Promise<string> {
    const imageForm = new FormData();
    imageForm.append('file', this.imageObj);
    return new Promise((resolve, reject) => {
      this.imageService.imageUpload(imageForm).subscribe(res => {
        resolve(res['file']);
      });
    })
  }

  async onAudioUpload(): Promise<string> {
    const audioForm = new FormData();
    audioForm.append('file', this.audioObj);
    return new Promise((resolve, reject) => {
      this.imageService.imageUpload(audioForm).subscribe(res => {
        resolve(res['file']);
      });
    })
  }
  
  submitForm(value: { title: string; reader: string}) {
    for (const key in this.uploadForm.controls) {
      this.uploadForm.controls[key].markAsDirty();
      this.uploadForm.controls[key].updateValueAndValidity();
    }
    
    const baseUrl = "https://taylor-audio-books.s3-us-west-1.amazonaws.com/";
    const image = baseUrl + this.imageUrl;
    const audio = baseUrl + this.audioUrl;
    
    this.audiosBookService.create(value.title, value.reader, image, audio);
  }
  
  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.uploadForm.reset();
    for (const key in this.uploadForm.controls) {
      this.uploadForm.controls[key].markAsPristine();
      this.uploadForm.controls[key].updateValueAndValidity();
    }
  }
}
