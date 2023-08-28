import { Component } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
  posts:any[]=[]
  constructor(private postService: PostService) {
    this.posts=this.postService.getPosts()
  }
  

  deletePost(postId: number): void {
    this.postService.deletePost(postId);
    this.posts=this.posts.filter(post=>post.id!=postId)
  }
}
