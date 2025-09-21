import { Component } from '@angular/core';
import { MainSliderComponent } from './components/main-slider/main-slider.component';
import { PopularProductsComponent } from './components/popular-products/popular-products.component';
import { PopularCategoriesComponent } from './components/popular-categories/popular-categories.component';

@Component({
  selector: 'app-home',
  imports: [
    MainSliderComponent,
    PopularProductsComponent,
    PopularCategoriesComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
