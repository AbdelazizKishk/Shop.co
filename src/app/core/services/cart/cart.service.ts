import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}
  cartNumber: WritableSignal<number> = signal(0);
  addProductToCart(id: string): Observable<any> {
    return this.http.post(
      `${environment.baseUrlPro}/api/v1/cart`,

      {
        productId: id,
      }
    );
  }
  updateCartProductQuantity(id: string, count: number): Observable<any> {
    return this.http.put(
      `${environment.baseUrlPro}/api/v1/cart/${id}`,

      {
        count: count,
      }
    );
  }
  getLoggedUserCart(): Observable<any> {
    return this.http.get(`${environment.baseUrlPro}/api/v1/cart`);
  }
  removeSpecificCartItem(id: string): Observable<any> {
    return this.http.delete(`${environment.baseUrlPro}/api/v1/cart/${id}`);
  }
  clearUserCart(): Observable<any> {
    return this.http.delete(`${environment.baseUrlPro}/api/v1/cart`);
  }
}
