import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private http: HttpClient) {}
  addProductToWishlist(id: string): Observable<any> {
    return this.http.post(
      `${environment.baseUrlPro}/api/v1/wishlist`,

      {
        productId: id,
      }
    );
  }
  getloggedUserWishlist(): Observable<any> {
    return this.http.get(`${environment.baseUrlPro}/api/v1/wishlist`);
  }
  removeProductFromWishlist(id: string): Observable<any> {
    return this.http.delete(`${environment.baseUrlPro}/api/v1/wishlist/${id}`);
  }
}
