import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class AllorderService {
  constructor(private http: HttpClient) {}

  checkoutSession(id: string, data: object): Observable<any> {
    return this.http.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,

      {
        shippingAddress: data,
      }
    );
  }
  getUserOrders(): Observable<any> {
    return this.http.get(
      `${environment.baseUrlPro}/api/v1/orders/user/68050b147b829a00762b9647`
    );
  }
}
