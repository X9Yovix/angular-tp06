import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
  postId!: number;
  post!: Post;
  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.postId = +this.route.snapshot.params['id']

    this.postService.find(this.postId)
      .subscribe((data: Post) => {
        this.post = data;
        this.initializeForm();
      });
  }

  initializeForm(): void {
    this.form = new FormGroup({
      title: new FormControl(this.post.title, [Validators.required]),
      body: new FormControl(this.post.body, [Validators.required])
    });
  }

  get f() {
    return this.form.controls;
  }

  submit(): void {
    if (this.form.valid) {
      const updatedPost = { ...this.post, ...this.form.value }
      this.postService.update(this.postId, updatedPost)
        .subscribe(() => {
          console.log("Post updated successfully!")
          this.router.navigateByUrl('/post/index')
        });
    }
  }
}