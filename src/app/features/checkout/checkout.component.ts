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
import { InputComponent } from '../../shared/components/input/input.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart/services/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly activatedRoutedonly = inject(ActivatedRoute);
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);

  cartId: WritableSignal<string | null> = signal('');

  checkoutForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
    this.getCartID();
  }
  initForm() {
    this.checkoutForm = this.fb.group({
      shippingAddress: this.fb.group({
        details: [null, [Validators.required]],
        phone: [
          null,
          [Validators.required, Validators.pattern(/^(\+2)?01[0125][0-9]{8}$/)],
        ],
        city: [null, [Validators.required]],
      }),
    });
  }
  getCartID() {
    this.activatedRoutedonly.paramMap.subscribe({
      next: (urlParams) => {
        this.cartId.set(urlParams.get('id'));
      },
    });
  }
  checkoutVisa(id: string, checkoutForm: object) {
    this.cartService.checkoutSession(id, checkoutForm).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          window.open(res.session.url, '_self');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  checkoutCash(id: string, checkoutForm: object) {
    this.cartService.checkoutCash(id, checkoutForm).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.router.navigate(['/allorders']);
        }
      },
    });
  }
  submitForm(payment: string) {
    if (this.checkoutForm.valid) {
      if (payment === 'visa') {
        this.checkoutVisa(this.cartId() as string, this.checkoutForm.value);
      } else {
        this.checkoutCash(this.cartId() as string, this.checkoutForm.value);
      }
    }
  }
}
