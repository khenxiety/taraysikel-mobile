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

  constructor(private router: Router) {}

  ngOnInit() {}

  test() {
    console.log('test');
  }

  navigate(route: string) {
    console.log(route);
    this.router.navigate([route]);
  }
}
