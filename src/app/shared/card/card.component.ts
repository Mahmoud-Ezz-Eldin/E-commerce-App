import { Component, inject, input, Input, InputSignal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Product } from './../../core/models/product.interface';
import { RouterLink } from '@angular/router';
import { CartService } from '../../features/cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  private readonly cartService = inject(CartService);
  private readonly toastr = inject(ToastrService);
  product: InputSignal<Product> = input.required();
  addProductToCart(id: string) {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cartService.cartCounter.set(res.numOfCartItems);
        this.toastr.success(res.message, 'ME Cart');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
