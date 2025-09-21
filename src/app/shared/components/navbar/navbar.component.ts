import { Component, Input, Signal, computed, inject } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { RegisterService } from '../../../core/auth/services/register.service';
import { ToggleModeComponent } from './components/toggle-mode/toggle-mode.component';
import { CartService } from '../../../features/cart/services/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, ToggleModeComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private readonly registerService = inject(RegisterService);
  private readonly cartService = inject(CartService);
  @Input({ required: true }) isLogin: boolean = true;
  counter: Signal<number> = computed(() => this.cartService.cartCounter());
  constructor(private flowbiteService: FlowbiteService) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  signOut() {
    this.registerService.logOut();
  }
}
