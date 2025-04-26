import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategories } from '../../shared/interfaces/icategories';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
  allCategories: WritableSignal<Icategories[]> = signal([]);
  ngOnInit(): void {
    this.getCategories();
  }
  getCategories(): void {
    this.categoriesService.getCategories().subscribe({
      next: (res) => {
        console.log(res);
        this.allCategories.set(res.data);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
