import { Component } from '@angular/core';
import { Post } from '../post';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post.service';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent {
  postId!: number
  post!: Post

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.postId = +this.route.snapshot.params['id']

    this.postService.find(this.postId)
      .subscribe((data: Post) => {
        this.post = data
      });
  }

  goBack(): void {
    this.router.navigateByUrl('/post/index')
  }
}
