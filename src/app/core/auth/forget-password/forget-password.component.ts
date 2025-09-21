import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputComponent } from '../../../shared/components/input/input.component';
import { RegisterService } from '../services/register.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [InputComponent, ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly toastr = inject(ToastrService);
  private readonly registerService = inject(RegisterService);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);
  step: number = 1;
  verifyEmail!: FormGroup;
  verifyCode!: FormGroup;
  resetPassword!: FormGroup;
  ngOnInit(): void {
    this.formInit();
  }
  formInit() {
    this.verifyEmail = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });
    this.verifyCode = this.fb.group({
      resetCode: [null, [Validators.required]],
    });
    this.resetPassword = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      newPassword: [
        null,
        [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z]).{10,20}$/)],
      ],
    });
  }

  forgotPassword() {
    if (this.verifyEmail.valid) {
      this.registerService.verifyEmail(this.verifyEmail.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.statusMsg === 'success') {
            this.toastr.success(res.message);
            this.step = 2;
          } else {
            this.toastr.error(res.message);
          }
        },
      });
    }
  }
  verifyResetCode() {
    if (this.verifyCode.valid) {
      this.registerService.verifyCode(this.verifyCode.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.status === 'Success') {
            this.step = 3;
          } else {
            this.toastr.error(res.message);
          }
        },
      });
    }
  }

  resetUserPassword() {
    if (this.resetPassword.valid) {
      this.registerService.resetPass(this.resetPassword.value).subscribe({
        next: (res) => {
          this.toastr.success('Password Reset Successfully', 'ME Cart');
          this.cookieService.set('token', res.token);
          this.router.navigate(['/login']);
        },
      });
    }
  }

  // nextStep() {
  //   if (this.step < 3) {
  //     this.step++;
  //   } else {
  //   }
  // }
}
