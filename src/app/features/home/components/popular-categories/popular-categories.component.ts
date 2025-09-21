import { Component, inject, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../../../core/services/categories/categories.service';
import { Category } from '../../../../core/models/category.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-popular-categories',
  imports: [CarouselModule],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.scss',
})
export class PopularCategoriesComponent {
  private readonly categoriesService = inject(CategoriesService);
  categoriesList: WritableSignal<Category[]> = signal([]);
  getAllCategoriesDetails() {
    this.categoriesService.getAllcategories().subscribe({
      next: (res) => {
        this.categoriesList.set(res.data);
      },
    });
  }

  ngOnInit(): void {
    this.getAllCategoriesDetails();
  }

  customCategoriesSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 4,
      },
      940: {
        items: 6,
      },
    },
    nav: false,
    autoplay: true,
    autoplayTimeout: 1500,
    autoplayHoverPause: true,
  };
}
