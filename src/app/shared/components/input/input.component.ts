import { Component, Input, signal, WritableSignal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Input() control: any;
  @Input() typeInput!: string;
  @Input() idInput!: string;
  @Input() label!: string;
  @Input() element: string = 'input';
  showpass: WritableSignal<boolean> = signal(false);
}
