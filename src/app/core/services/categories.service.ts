import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<any> {
    return this.http.get(`${environment.baseUrlPro}/api/v1/categories`);
  }

  getProductsByCategory(category: string): Observable<any> {
    return this.http.get(
      `${environment.baseUrlPro}/api/v1/categories/${category}`
    );
  }
}
