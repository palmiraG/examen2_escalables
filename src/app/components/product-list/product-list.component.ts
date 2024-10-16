import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interface/product';
import { CurrencyPipe, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { CategoryFilterComponent } from '../category-filter/category-filter.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CurrencyPipe, RouterModule, NgFor, CategoryFilterComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Input() products: Product[] = [];
  filteredProducts: Product[] = []; 

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
      this.filteredProducts = data; 
      console.log(this.products); 
    });
  }

  filterProductsByCategory(category: string): void {
    this.filteredProducts = this.products.filter(product => product.category === category);
  }
  onCategorySelected(category: string): void {

    localStorage.setItem('selectedCategory', category);
  }
}
