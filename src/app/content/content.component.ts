import { Component, OnInit } from '@angular/core';

import { Post } from '../post.model';
import { AudiosBookService } from '../services/audiosBook.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  cards: any = [];
  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(
    public audiosBookService: AudiosBookService,
  ) { }

  ngOnInit(): void {
    this.initCards();
  }
  
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
  
  initCards() {
    this.audiosBookService.getPosts();
    this.postsSub = this.audiosBookService.getPostUpdateListener()
    .subscribe((posts: Post[]) => {
      console.log('posts', posts);
      this.posts = posts;
    });
  }

}
