import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from "rxjs";
import { Post } from '../post.model';

const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AudiosBookService {

  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  
  constructor(private http: HttpClient) { }

  getPosts() {
    const url = `${baseUrl}/posts`;
    this.http
    .get<{ message: string; posts: Post[] }>(url)
    .subscribe(postData => {
      this.posts = postData.posts;
      this.postsUpdated.next([...this.posts]);
    });
  }
  
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  get(id) {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(title: string, reader: string, image: string, audio: string) {
    const url = `${baseUrl}/create`;
    const post: Post = {id: null, title: title, reader:reader, image: image, audio: audio}
    this.http
      .post<{ message: string }>(url, post)
      .subscribe(responseData => {
        console.log(responseData.message);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      })
  }

  update(id, data) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll() {
    return this.http.delete(baseUrl);
  }

  findById(id: string) {
    return this.http.get<{
      id: string;
      title: string;
      reader: string;
      image: string;
      audio: string;
    }>(`${baseUrl}/posts/${id}`);  }
}
