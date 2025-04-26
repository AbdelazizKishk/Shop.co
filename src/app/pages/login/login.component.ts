import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnDestroy } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private intervalId: any;
  errorMsg: string = '';
  scucessMsg: boolean = false;
  isLoading: boolean = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.loginUser(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === 'success') {
            this.scucessMsg = true;
            this.loginForm.reset();
          }
          this.isLoading = false;
          localStorage.setItem('usertoken', res.token);
          this.authService.saveUserData();
          this.intervalId = setInterval(() => {
            this.router.navigate(['/home']);
          }, 2000);
        },
        error: (err: HttpErrorResponse) => {
          this.errorMsg = err.error.message;
          this.isLoading = false;
          console.log(err);
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
