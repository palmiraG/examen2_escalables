import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../../services/product.service'; 
import { Product } from '../../interface/product';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './category-filter.component.html',
  styleUrl: './category-filter.component.css'
})

export class CategoryFilterComponent implements OnInit {
  categories: string[] = [];
  showCategories = false;

  @Output() categorySelected = new EventEmitter<string>(); // Usamos Output para emitir el evento de selección

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Obtener todos los productos para extraer las categorías
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.categories = [...new Set(products.map(product => product.category))]; // Extraer categorías únicas
    });
  }

  toggleCategoryMenu(): void {
    this.showCategories = !this.showCategories; // Mostrar u ocultar el menú de categorías
  }

  selectCategory(category: string): void {
    this.categorySelected.emit(category); // Emitir la categoría seleccionada
    this.showCategories = false; // Ocultar el menú de categorías
  }  
}
