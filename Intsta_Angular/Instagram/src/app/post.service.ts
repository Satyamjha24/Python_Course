import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts = [
    { id: 1, title: 'First Post', content: 'This is the content of the first post.' },
    { id: 2, title: 'Second Post', content: 'This is the content of the second post.' }
  ];

  getPosts() {
    return this.posts;
  }

  addPost(newPost:{id:number,title:string,content:string}) {
    this.posts.push(newPost);
  }

  deletePost(postId: number) {
    this.posts = this.posts.filter(post => post.id !== postId);
  }
}
