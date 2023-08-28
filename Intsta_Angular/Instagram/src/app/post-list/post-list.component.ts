import { Component } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
  constructor(public postService: PostService) {}

  deletePost(postId: number): void {
    this.postService.deletePost(postId);
  }
}
