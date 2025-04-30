import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  isMenuOpen = false;
  isLogin = input<boolean>(true);
  countCart: Signal<number> = computed(() => this.cartService.cartNumber());
  ngOnInit(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartService.cartNumber.set(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
