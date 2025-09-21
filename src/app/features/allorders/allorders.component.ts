import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CartService } from '../cart/services/cart.service';
import { Purchase } from './models/purchase.interface';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss',
})
export class AllordersComponent implements OnInit {
  private readonly cartService = inject(CartService);
  purchases: WritableSignal<Purchase[]> = signal([]);
  name: string = '';
  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts() {
    this.cartService.getUserOrders().subscribe({
      next: (res) => {
        this.purchases.set(res);
        console.log(this.purchases);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
