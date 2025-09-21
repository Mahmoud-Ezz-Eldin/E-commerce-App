import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-notfound',
  imports: [RouterLink],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.scss',
})
export class NotfoundComponent implements OnInit {
  private readonly cookieService = inject(CookieService);
  token: string = '';
  ngOnInit() {
    this.token = this.cookieService.get('token');
  }
}
