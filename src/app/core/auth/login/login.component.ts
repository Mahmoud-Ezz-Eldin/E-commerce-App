import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { Router, RouterLink } from '@angular/router';
import { InputComponent } from '../../../shared/components/input/input.component';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private readonly loginService = inject(RegisterService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly cookieService = inject(CookieService);

  errorMessage: WritableSignal<string> = signal('');
  isLoading: WritableSignal<boolean> = signal(false);
  loginSuccess: WritableSignal<boolean> = signal(false);
  subscribtion: Subscription = new Subscription();
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z]).{10,20}$/)],
      ],
    });
  }
  submitData(): void {
    this.isLoading.set(true);
    if (this.loginForm.valid) {
      this.subscribtion.unsubscribe();
      this.subscribtion = this.loginService
        .loginForm(this.loginForm.value)
        .subscribe({
          next: (res) => {
            if (res.message === 'success') {
              this.cookieService.set('token', res.token);

              this.errorMessage.set('');
              this.loginSuccess.set(true);
              this.isLoading.set(false);
              setTimeout(() => {
                this.router.navigate(['/home']);
              }, 1500);
            }
          },
          error: (err) => {
            this.isLoading.set(false);
            this.errorMessage.set(err.error.message);
          },
        });
    }
  }
}
