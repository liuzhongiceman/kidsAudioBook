import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor(private router: Router) { }
  
  @Input() post; any;
  authorImage: string;
  dadImage: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
  momImage: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
  youtubeImage: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
  
  ngOnInit(): void {
    this.initAuthorImage();
    console.log('post', this.post);
  }
  
  initAuthorImage() {
    switch (this.post.reader.toLowerCase()) {
      case 'mom':
        this.authorImage = this.momImage;
      case 'dad':
        this.authorImage = this.dadImage;
      default:
        this.authorImage = this.youtubeImage;
    }
  }
  
  handleRouter(id: string) {
    this.router.navigate(['/products', id]);
  }
}
