import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  posts: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.dataService.getPosts().subscribe((data) => {
      this.posts = data;
    });
  }

  addPost() {
    const newPost = {
      title: 'New Post',
      body: 'This is a new Post.',
      userId: 1,
    };
    this.dataService.createPost(newPost).subscribe(() => {
      this.posts.unshift(newPost);
    });
  }

  updatePost(post: any) {
    const updatedPost = { ...post, title: 'Updated Title' };
    this.dataService.updatePost(post.id, updatedPost).subscribe(() => {
      const index = this.posts.findIndex((p) => p.id === post.id);
      this.posts[index] = updatedPost;
    });
  }

  deletePost(id: number) {
    this.dataService.deletePost(id).subscribe(() => {
      this.posts = this.posts.filter((post) => post.id !== id);
    });
  }
}
