import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';
import { InputComponent } from '../../../shared/components/input/input.component';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private readonly registerService = inject(RegisterService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  errorMessage: WritableSignal<string> = signal('');
  isLoading: WritableSignal<boolean> = signal(false);
  registerSuccess: WritableSignal<boolean> = signal(false);
  subscribtion: Subscription = new Subscription();
  registerForm: FormGroup;

  /**
   *
   */
  constructor() {
    this.registerForm = this.formInit();
  }
  // registerForm: FormGroup = new FormGroup(
  //   {
  //     name: new FormControl(null, [
  //       Validators.required,
  //       Validators.minLength(3),
  //       Validators.maxLength(20),
  //     ]),
  //     email: new FormControl(null, [Validators.required, Validators.email]),
  //     password: new FormControl(null, [
  //       Validators.required,
  //       Validators.pattern(/^(?=.*[a-zA-Z]).{10,20}$/),
  //     ]),
  //     rePassword: new FormControl(null, [
  //       Validators.required,
  //       Validators.pattern(/^(?=.*[a-zA-Z]).{10,20}$/),
  //     ]),
  //     phone: new FormControl(null, [
  //       Validators.required,
  //       Validators.pattern(/^(\+2)?01[0125][0-9]{8}$/),
  //     ]),
  //   },
  //   { validators: this.confirmPassword }
  // );

  confirmPassword(group: AbstractControl) {
    if (group.get('password')?.value === group.get('rePassword')?.value) {
      return null;
    } else {
      group.get('rePassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
  }
  formInit(): FormGroup {
    return this.fb.group(
      {
        name: [
          null,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
            Validators.pattern(/^[a-zA-Z\s]+$/),
          ],
        ],
        email: [null, [Validators.required, Validators.email]],
        password: [
          null,
          [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z]).{10,20}$/)],
        ],
        rePassword: [null, [Validators.required]],
        phone: [
          null,
          [Validators.required, Validators.pattern(/^(\+2)?01[0125][0-9]{8}$/)],
        ],
      },
      { validators: this.confirmPassword }
    );
  }
  submitData(): void {
    this.isLoading.set(true);
    if (this.registerForm.valid) {
      this.subscribtion.unsubscribe();
      this.subscribtion = this.registerService
        .registerForm(this.registerForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.message === 'success') {
              this.errorMessage.set('');
              this.registerSuccess.set(true);
              this.isLoading.set(false);
              setTimeout(() => {
                this.router.navigate(['/login']);
              }, 1500);
            }
          },
          error: (err) => {
            this.isLoading.set(false);
            console.log(err);
            this.errorMessage.set(err.error.message);
          },
        });
    }
  }
}
