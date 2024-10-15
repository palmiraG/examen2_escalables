import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,  HttpClientModule,ProductListComponent,
    ProductDetailComponent, CategoryFilterComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'examen';
  onCategorySelected(category: string): void {
    // Guardar la categoría seleccionada para que pueda ser usada en el listado de productos
    localStorage.setItem('selectedCategory', category);
  }
}

