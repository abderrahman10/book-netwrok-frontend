import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  templateUrl: './rating-stars.component.html',
  styleUrl: './rating-stars.component.scss'
})
export class RatingStarsComponent {
  @Input() rating: number = 0;
  maxRating: number = 5;

  get effectiveRating(): number {
    // Limite la note à un maximum de 5
    return Math.min(this.rating, this.maxRating);
  }

  get fullStars(): number[] {
    const fullStarsCount = Math.floor(this.effectiveRating);
    return Array(fullStarsCount).fill(0);
  }

  get hasHalfStar(): boolean {
    return this.effectiveRating % 1 !== 0;
  }

  get emptyStars(): number[] {
    const emptyStarsCount = this.maxRating - Math.ceil(this.effectiveRating);
    return Array(emptyStarsCount).fill(0);
  }
}
