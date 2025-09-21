import { HttpClient } from '@angular/common/http';
import {
  computed,
  inject,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { RegisterService } from '../../../core/auth/services/register.service';
import { DecodedToken } from '../../../core/models/decoded-token.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient = inject(HttpClient);
  private readonly registerService = inject(RegisterService);

  // userData: DecodedToken = this.registerService.decodeToken() as DecodedToken;
  userData: WritableSignal<DecodedToken> = signal(
    this.registerService.decodeToken() as DecodedToken
  );
  userId: Signal<string> = computed(() => this.userData().id);

  cartCounter: WritableSignal<number> = signal(0);
  /* Can't find an api to get numOfCart Items after loggin so it appears
  with it's intial value (0) if it is the first login ,
   or the last memorized value*/

  addProductToCart(id: string): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl + environment.endPointCart,
      { productId: id }
    );
  }
  getLoggedUserCart(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + environment.endPointCart);
  }

  deleteSpecificCartItem(id: string): Observable<any> {
    return this.httpClient.delete(
      environment.baseUrl + environment.endPointCart + id
    );
  }

  updateProductQuantity(id: String, count: number): Observable<any> {
    return this.httpClient.put(
      environment.baseUrl + environment.endPointCart + id,
      {
        count: count,
      }
    );
  }

  checkoutSession(id: string, shippingDetails: object): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl +
        environment.endPointOrders +
        environment.endPointCheckout +
        id +
        environment.port,
      shippingDetails
    );
  }

  checkoutCash(id: string, shippingDetails: object): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl + environment.endPointOrders + id,
      shippingDetails
    );
  }
  getUserOrders(): Observable<any> {
    return this.httpClient.get(
      environment.baseUrl + environment.endPointOrders + 'user/' + this.userId()
    );
  }
  clearCart(): Observable<any> {
    return this.httpClient.delete(
      environment.baseUrl + environment.endPointCart
    );
  }
}
