import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interface/product';
import { CurrencyPipe, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CurrencyPipe, RouterModule, NgFor ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
      this.filteredProducts = data; // Mostrar todos los productos por defecto

      // Aplicar filtro si ya hay una categoría seleccionada
      const selectedCategory = localStorage.getItem('selectedCategory');
      if (selectedCategory) {
        this.filterProductsByCategory(selectedCategory);
      }
    });
  }

  filterProductsByCategory(category: string): void {
    this.filteredProducts = this.products.filter(product => product.category === category);
  }
}
