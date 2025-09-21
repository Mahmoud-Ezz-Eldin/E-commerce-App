import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CartService } from './services/cart.service';
import { CartDetails } from './models/cart-details.interface';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  private readonly cartService = inject(CartService);
  private readonly toastr = inject(ToastrService);
  cartId: WritableSignal<string | null> = signal('');
  cartDetails: WritableSignal<CartDetails | null> = signal(null);
  ngOnInit(): void {
    this.getLoggedUserData();
  }
  getLoggedUserData() {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        console.log(res);
        this.cartId.set(res.cartId);
        this.cartDetails.set(res.data);
      },
    });
  }

  removeCartItem(id: string) {
    this.cartService.deleteSpecificCartItem(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cartService.cartCounter.set(res.numOfCartItems);
        this.cartDetails.set(res.data);
        this.toastr.success(
          'Product removed successfully from your cart',
          'ME Cart'
        );
      },
    });
  }

  updateProductCount(id: string, count: number) {
    this.cartService.updateProductQuantity(id, count).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails.set(res.data);
      },
    });
  }

  clearCart() {
    this.cartService.clearCart().subscribe({
      next: (res) => {
        console.log(res);
        if (res.message === 'success') {
          this.getLoggedUserData();
          this.toastr.success('Cart Cleared Successfully !', 'ME Cart');
        }
      },
    });
  }
}
