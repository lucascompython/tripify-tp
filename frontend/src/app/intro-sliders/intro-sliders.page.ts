import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { SwiperContainer } from 'swiper/element';

@Component({
  selector: 'app-register',
  templateUrl: 'intro-sliders.page.html',
  styleUrls: ['intro-sliders.page.scss'],
  imports: [IonContent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
})
export class IntroSlidersPage {
  @ViewChild('swiper') swiperRef!: ElementRef<SwiperContainer>;

  currentSlide = 0;

  constructor(private router: Router) {}

  swipePrev() {
    const didChange = this.swiperRef.nativeElement.swiper.slidePrev();
    if (didChange) {
      this.currentSlide--;
    }
  }

  swipeNext() {
    const didChange = this.swiperRef.nativeElement.swiper.slideNext();
    if (didChange) {
      this.currentSlide++;
    } else {
      if (this.currentSlide === 3) {
        this.router.navigate(['/register']);
      }
    }
  }
}
