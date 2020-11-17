import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {
  private url = 'https://jsonplaceholder.typicode.com/posts'
  posts: any;


  constructor(private http: HttpClient) { 
    http.get(this.url).subscribe(response => {
      this.posts = response
     
    })
  }

  createPost(input: HTMLInputElement) {
    let post = {
      title: input.value
    }
    input.value = ''
    this.http.post(this.url, JSON.stringify(post)).subscribe(response => {
      post['id'] = response
      this.posts.splice(0,0,post)

    }) 
  }

  updatePost(post) {
    this.http.patch(this.url + "/" + post.id, JSON.stringify({isRead: true})).subscribe(response => {
      console.log(response)
    })
  }

  deletePost(post) {
    this.http.delete(this.url + "/" + post.id).subscribe(response => {
      let index = this.posts.indexOf(post);
      this.posts.splice(index, 1)
    })
  }


}
