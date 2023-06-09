import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  OnInit,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.page.html',
  styleUrls: ['./slider.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SliderPage implements OnInit {
  @Input() data: any[] = [];
  @Input() categoryName: string = '';

  public isLoading: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.isLoading = true; //loading instance

    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  test() {
    console.log('test');
  }

  navigate(route: string, id: any) {
    console.log(route);
    this.router.navigate([`${route}/`, id]);
  }
}
