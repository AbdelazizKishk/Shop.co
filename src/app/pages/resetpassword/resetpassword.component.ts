import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  imports: [ReactiveFormsModule],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css',
})
export class ResetpasswordComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  step: number = 1;
  isLoading: boolean = false;

  verfiyEmailForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  verfiyCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{6}$/),
    ]),
  });
  verfiyNewpassForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  onSubmitEmail() {
    this.isLoading = true;
    let emailVaule = this.verfiyEmailForm.value.email;
    this.verfiyNewpassForm.patchValue({ email: emailVaule });
    this.authService.setEmailVerify(this.verfiyEmailForm.value).subscribe({
      next: (res) => {
        console.log(res);
        if ((res.statusMsg = 'success')) {
          this.step = 2;
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      },
    });
  }
  onSubmitCode() {
    this.isLoading = true;
    this.authService.resetCodeVerfiy(this.verfiyCodeForm.value).subscribe({
      next: (res) => {
        console.log(res);
        if ((res.status = 'Success')) {
          this.step = 3;
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      },
    });
  }
  onSubmitNewPassword() {
    this.isLoading = true;
    this.authService.setNewPassword(this.verfiyNewpassForm.value).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('usertoken', res.token);
        this.router.navigate(['/home']);
        this.authService.saveUserData();
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      },
    });
  }
}
