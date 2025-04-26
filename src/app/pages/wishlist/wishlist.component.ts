import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);
  emptyWishlist: WritableSignal<boolean> = signal(false);
  allWishlistProducts: WritableSignal<Iproduct[]> = signal([]);
  ngOnInit(): void {
    this.getWishlist();
  }
  getWishlist() {
    this.wishlistService.getloggedUserWishlist().subscribe({
      next: (res) => {
        this.allWishlistProducts.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  removeProductFromWishlist(id: string) {
    this.wishlistService.removeProductFromWishlist(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastrService.success(
            'Product removed from Wishlist successfully',
            'Removed',
            {
              timeOut: 3000,
              progressBar: true,
              progressAnimation: 'increasing',
            }
          );
          this.allWishlistProducts.set(
            this.allWishlistProducts().filter((product) => product._id !== id)
          );
        }
        this.getWishlist();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
