import {
  Component,
  ElementRef,
  inject,
  OnInit,
  Renderer2,
  signal,
  WritableSignal,
} from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import Swal from 'sweetalert2';
import { Icategories } from '../../shared/interfaces/icategories';

@Component({
  selector: 'app-home',
  imports: [CarouselModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
  private readonly productsService = inject(ProductsService);
  private readonly toastrService = inject(ToastrService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly renderer2 = inject(Renderer2);
  private readonly el = inject(ElementRef);
  showScrollTopBtn = false;
  allCategories: WritableSignal<Icategories[]> = signal([]);
  allProducts: WritableSignal<Iproduct[]> = signal([]);
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 5,
      },
    },
    nav: false,
  };
  ngOnInit(): void {
    this.renderer2.listen('window', 'scroll', () => {
      const hero = this.el.nativeElement.querySelector('hero');
      const heroHeight = hero?.offsetHeight || 300;

      const scrollY =
        window.pageYOffset || document.documentElement.scrollTop || 0;

      this.showScrollTopBtn = scrollY > heroHeight;
    });
    this.getCategories();
    this.getProducts();
  }
  getCategories(): void {
    this.categoriesService.getCategories().subscribe({
      next: (res) => {
        this.allCategories.set(res.data);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  getProducts(): void {
    this.productsService.getProducts().subscribe({
      next: (res) => {
        this.allProducts.set(res.data);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  addProductToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'Success', {
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
}
