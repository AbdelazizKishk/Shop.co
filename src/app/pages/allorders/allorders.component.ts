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

@Component({
  selector: 'app-allorders',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css',
})
export class AllordersComponent implements OnInit {
  private readonly allorderService = inject(AllorderService);
  allOrders: WritableSignal<ShippingAddress[]> = signal([]);
  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(): void {
    this.allorderService.getUserOrders().subscribe({
      next: (res) => {
        this.allOrders.set(res);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
