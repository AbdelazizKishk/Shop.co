import { Iproduct } from './../../shared/interfaces/iproduct';
import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details-prod',
  imports: [],
  templateUrl: './details-prod.component.html',
  styleUrl: './details-prod.component.css',
})
export class DetailsProdComponent implements OnInit {
  private readonly ProductsService = inject(ProductsService);
  private readonly wishlistService = inject(WishlistService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly toastrService = inject(ToastrService);
  private readonly cartService = inject(CartService);
  productInfo: WritableSignal<Iproduct> = signal({} as Iproduct);
  ngOnInit(): void {
    this.getProduct();
  }
  getProduct(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (p) => {
        const productId = p.get('id');
        this.ProductsService.getProduct(productId).subscribe({
          next: (res) => {
            this.productInfo.set(res.data);
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
    });
  }
  addProductToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this.toastrService.success('Product added to cart', 'Success', {
            timeOut: 3000,
            progressBar: true,
            progressAnimation: 'increasing',
          });
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  addProductToWishlist(id: string): void {
    this.wishlistService.addProductToWishlist(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: res.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
