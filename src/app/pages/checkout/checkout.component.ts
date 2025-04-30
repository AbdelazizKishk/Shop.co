import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { AllorderService } from '../../core/services/allorder/allorder.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  private readonly allorderService = inject(AllorderService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  errorMsg: string = '';
  cartId: string = '';
  scucessMsg: boolean = false;
  isLoading: boolean = false;
  checkoutForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
    this.getCartId();
  }
  initForm(): void {
    this.checkoutForm = this.fb.group({
      details: ['', [Validators.required, Validators.minLength(10)]],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
      city: ['', [Validators.required]],
    });
  }
  getCartId() {
    this.activatedRoute.paramMap.subscribe({
      next: (p) => {
        this.cartId = p.get('id')!;
      },
    });
  }
  onSubmit() {
    if (this.checkoutForm.valid) {
      this.isLoading = true;
      this.allorderService
        .checkoutSession(this.cartId, this.checkoutForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            if ((res.status = 'success')) {
              this.scucessMsg = true;
              window.location.assign(res.session.url);
            }
            this.isLoading = false;
          },
          error: (err) => {
            console.log(err);
            this.isLoading = false;
          },
        });
    } else {
      console.log('Form is invalid');
    }
  }
}
