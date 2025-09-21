import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpecificProductService } from './services/specific-product.service';
import { Product } from '../../core/models/product.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../cart/services/cart.service';

@Component({
  selector: 'app-details',
  imports: [CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly specificProduct = inject(SpecificProductService);
  private readonly cartService = inject(CartService);
  productID: WritableSignal<string | null> = signal(null);

  productDetails: Product = {} as Product;
  ngOnInit(): void {
    this.getProductIdfromUrl();
    this.getSpecificProductDetails();
  }
  getProductIdfromUrl() {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.productID.set(res.get('id'));
      },
    });
  }

  getSpecificProductDetails() {
    this.specificProduct.getSpecificProduct(this.productID()).subscribe({
      next: (res) => {
        this.productDetails = res.data;
        console.log(this.productDetails);
      },
    });
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: [
      '<i class="fa-solid fa-circle-arrow-left text-main bg-transparent text-4xl"></i>',
      '<i class="fa-solid fa-circle-arrow-right text-main bg-transparent text-4xl"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    margin: 10,
  };

  addProductToCart(id: string) {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cartService.cartCounter.set(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
