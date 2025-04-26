import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { AllorderService } from '../../core/services/allorder/allorder.service';
import { ShippingAddress } from '../../shared/interfaces/Shipping/shipping-address';
import { CurrencyPipe, DatePipe } from '@angular/common';

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
    this.allorderService.getAllOrders().subscribe({
      next: (res) => {
        console.log(res.data);
        this.allOrders.set(res.data);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
