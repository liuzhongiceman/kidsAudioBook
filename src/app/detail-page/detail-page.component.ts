import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AudiosBookService } from '../services/audiosBook.service';
import { Post } from '../post.model';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit {
  
  id: string;
  private sub: any;
  post: Post;
  
  constructor(
    private route: ActivatedRoute,
    private audioBookService: AudiosBookService
    ) { }
  
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = params['id'];
       this.audioBookService.findById(this.id).subscribe(data => {
         this.post = data;
       });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
