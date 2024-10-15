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

  @Output() categorySelected = new EventEmitter<string>(); 

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.categories = [...new Set(products.map(product => product.category))]; 
    });
  }

  toggleCategoryMenu(): void {
    this.showCategories = !this.showCategories; 
  }

  selectCategory(category: string): void {
    this.categorySelected.emit(category); 
    this.showCategories = false; 
  }  
}
