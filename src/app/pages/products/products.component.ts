import { RouterLink } from '@angular/router';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { ProductsService } from './../../core/services/products.service';
import {
  Component,
  ElementRef,
  inject,
  OnInit,
  Renderer2,
  signal,
  WritableSignal,
} from '@angular/core';
import { SearchPipe } from '../../shared/search.pipe';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import Swal from 'sweetalert2';
import * as AOS from 'aos';

@Component({
  selector: 'app-products',
  imports: [RouterLink, SearchPipe, FormsModule, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);
  private readonly renderer2 = inject(Renderer2);
  private readonly el = inject(ElementRef);
  showScrollTopBtn = false;
  searchQuery: string = '';
  allProducts: WritableSignal<Iproduct[]> = signal([]);

  ngOnInit(): void {
    AOS.init({
      duration: 1000, // animation duration
      once: false, // whether animation should happen only once
    });
    this.renderer2.listen('window', 'scroll', () => {
      const hero = this.el.nativeElement.querySelector('hero');
      const heroHeight = hero?.offsetHeight || 300;

      const scrollY =
        window.pageYOffset || document.documentElement.scrollTop || 0;

      this.showScrollTopBtn = scrollY > heroHeight;
    });
    this.getAllProducts();
  }
  getAllProducts(): void {
    this.productsService.getProducts().subscribe({
      next: (res) => {
        console.log(res);
        this.allProducts.set(res.data);
      },
      error: (error) => {
        console.error(error);
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
          this.cartService.cartNumber.set(res.numOfCartItems);
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

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
