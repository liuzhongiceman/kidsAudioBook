import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  
  constructor() { }
  
  @Input() card; any;
  authorImage: string;
  dadImage: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
  momImage: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
  youtubeImage: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
  
  ngOnInit(): void {
    // this.initAuthorImage();
  }
  
  initAuthorImage() {
    switch (this.card.author.toLowerCase()) {
      case 'mom':
        this.authorImage = this.momImage;
      case 'dad':
        this.authorImage = this.dadImage;
      default:
        this.authorImage = this.youtubeImage;
      
    }
  }
  
  

}
