import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { cart } from '../../shared/interfaces/cart/cart';
import { CurrencyPipe } from '@angular/common';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  allProductscart: WritableSignal<cart> = signal({} as cart);
  emptyCart: boolean = false;
  ngOnInit(): void {
    this.getAllProductsCart();
  }
  getAllProductsCart() {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        console.log(res);
        this.allProductscart.set(res.data);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  updateProductQuantity(id: string, count: number): void {
    this.cartService.updateCartProductQuantity(id, count).subscribe({
      next: (res) => {
        this.allProductscart.set(res.data);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  removeProductFromCart(id: string): void {
    this.cartService.removeSpecificCartItem(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this.toastrService.success(
            'Product removed from cart successfully',
            'Removed',
            {
              timeOut: 3000,
              progressBar: true,
              progressAnimation: 'increasing',
            }
          );
        }
        this.allProductscart.set(res.data);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  clearCart(): void {
    this.cartService.clearUserCart().subscribe({
      next: (res) => {
        if (res.message === 'success') {
          Swal.fire({
            title: 'Are you sure?',
            text: 'This action will clear your cart!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
          }).then((result) => {
            if (result.isConfirmed) {
              this.allProductscart.set({} as cart);
              this.emptyCart = true;
              Swal.fire({
                title: 'Deleted!',
                text: 'Your Cart has been Cleard.',
                icon: 'success',
              });
            } else {
              Swal.fire('Cancelled', 'Your cart is safe 😊', 'info');
            }
          });
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
