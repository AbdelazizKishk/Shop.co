import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { AllorderService } from '../../core/services/allorder/allorder.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ShippingAddress } from '../../shared/interfaces/Shipping/shipping-address';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-allorders',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css',
})
export class AllordersComponent implements OnInit {
  private readonly allorderService = inject(AllorderService);
  userData: any = null;
  userId: string = '';
  allOrders: WritableSignal<ShippingAddress[]> = signal([]);
  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(): void {
    this.userData = jwtDecode(localStorage.getItem('usertoken')!);
    this.userId = this.userData.id;
    this.allorderService.getUserOrders(this.userId).subscribe({
      next: (res) => {
        console.log(res);
        this.allOrders.set(res);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
