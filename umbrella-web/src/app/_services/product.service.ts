import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../_models/api.response';
import { Product } from '../_models/product';
import { environment } from 'src/environments/environment.development';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<ApiResponse<Product[]>>(`${environment.apiUrl}/getProduct`).pipe(
      map( res => res.data )
    )
  }

  getAllCliente() {
    return this.http.get<ApiResponse<Product[]>>(`${environment.apiUrl}/getProductsUser`).pipe(
      map( res => res.data )
    )
  }

  insert(produto: Product) {
    return this.http.post<ApiResponse<Product>>(`${environment.apiUrl}/addProduct`, produto).pipe(
      map( res => res )
    )
  } 

  getOne(id: string) {
    return this.http.get<ApiResponse<Product>>(`${environment.apiUrl}/getProductById?id=${id}`).pipe(
      map( res => res.data )
    )
  }

  update(product:Product) {
    return this.http.put<ApiResponse<Product>>(`${environment.apiUrl}/updateProduct`, product).pipe(
      map(res => res)
    )
  }
}
