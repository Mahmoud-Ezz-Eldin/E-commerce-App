import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { CardComponent } from '../../shared/card/card.component';
import { Product } from '../../core/models/product.interface';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module

@Component({
  selector: 'app-products',
  imports: [CardComponent, NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  productList: WritableSignal<Product[]> = signal([]);
  pageSize: WritableSignal<number | string> = signal('');
  currentPage: WritableSignal<number | string> = signal('');
  totalItems: WritableSignal<number | string> = signal('');

  getAllproductsDetails(pageNumber: number = 1) {
    this.productsService.getAllProducts(pageNumber).subscribe({
      next: (res) => {
        this.productList.set(res.data);
        this.pageSize.set(res.metadata.limit);
        this.currentPage.set(res.metadata.currentPage);
        this.totalItems.set(res.results);
      },
    });
  }
  ngOnInit(): void {
    this.getAllproductsDetails();
  }
  pageChanged(currentPage: number) {
    this.getAllproductsDetails(currentPage);
  }
}
