import { Component } from '@angular/core';
import { PostListComponent } from '../post-list/post-list.component';
import { PostService } from '../post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  newPost = { id: 0, title: '', content: '' };

  constructor(private postService: PostService) {}

  addPost(): void {
    if (this.newPost.title && this.newPost.content) {
      this.newPost.id = this.postService.getPosts().length + 1;
      this.postService.addPost({ ...this.newPost });
      this.newPost = { id: 0, title: '', content: '' };
    }
  }
}
