import { Component, inject, signal, WritableSignal } from '@angular/core';
import { CardComponent } from '../../../../shared/card/card.component';
import { ProductsService } from '../../../../core/services/products/products.service';
import { Product } from '../../../../core/models/product.interface';

@Component({
  selector: 'app-popular-products',
  imports: [CardComponent],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.scss',
})
export class PopularProductsComponent {
  private readonly productsService = inject(ProductsService);
  productList: WritableSignal<Product[]> = signal([]);
  getAllProductsDetails(): void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.productList.set(res.data);
      },
    });
  }
  ngOnInit(): void {
    this.getAllProductsDetails();
  }
}
