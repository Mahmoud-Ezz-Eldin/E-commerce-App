import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-toggle-mode',
  imports: [],
  templateUrl: './toggle-mode.component.html',
  styleUrls: ['./toggle-mode.component.scss'],
})
export class ToggleModeComponent implements AfterViewInit {
  private readonly cookieService = inject(CookieService);
  @ViewChild('toggle') toggleRef!: ElementRef<HTMLInputElement>;

  ngAfterViewInit(): void {
    this.checkMode();
  }

  togglemode(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.cookieService.set('ME-Apperance', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      this.cookieService.set('ME-Apperance', 'light');
      document.documentElement.classList.remove('dark');
    }
  }

  checkMode() {
    const mode = this.cookieService.get('ME-Apperance');

    if (mode === 'dark') {
      this.toggleRef.nativeElement.checked = true;
      document.documentElement.classList.add('dark');
    } else {
      this.toggleRef.nativeElement.checked = false;
      document.documentElement.classList.remove('dark');
    }
  }
}
