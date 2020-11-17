import { Component, OnInit } from '@angular/core';
import {PostService} from "../services/post.service"

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  
  posts: any;
  constructor(private service: PostService) { 
  }

  ngOnInit() {
    this.service.getPosts().subscribe(response => {
      this.posts = response
    }, error => {
      alert('An error occurred')
      console.log(error)
    })
  }

  createPost(input: HTMLInputElement) {
    let post = {
      title: input.value
    };
    input.value = "";

    this.service.createPost(post).subscribe( response => {
      post['id'] = response
      this.posts.unshift(post)
    }, error => {
      alert(error)
      console.log(error)
    })
  }

  updatePost(post) {
    this.service.updatePost(post).subscribe(response => {
      console.log(response)
    }, error => {
      alert(error)
      console.log(error)
    })
  }

  deletePost(post) {
    this.service.deletePost(post.id).subscribe(response => {
      let index = this.posts.indexOf(post);
      this.posts.splice(index, 1)
    }, ( error: Response) => {
      if (error.status === 404){
        alert('This post has already been deleted.')
      } else {
        alert('An unexpected error occurred.')
      }
  })
}


}
