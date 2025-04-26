import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Icategories } from '../../shared/interfaces/icategories';
import { Idetcat } from '../../shared/interfaces/idetcat';

@Component({
  selector: 'app-details-catg',
  imports: [],
  templateUrl: './details-catg.component.html',
  styleUrl: './details-catg.component.css',
})
export class DetailsCatgComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
  private readonly activatedRoute = inject(ActivatedRoute);

  allCategories: WritableSignal<Idetcat> = signal({} as Idetcat);
  ngOnInit(): void {
    this.getProductsByCategory();
  }
  getProductsByCategory(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (p) => {
        const category = p.get('category') || '';
        this.categoriesService.getProductsByCategory(category).subscribe({
          next: (res) => {
            console.log(res.data);
            this.allCategories().set(res.data);
          },
          error: (err) => {
            console.error(err);
          },
        });
      },
    });
  }
}
