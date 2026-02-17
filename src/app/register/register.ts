import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html'
})

export class Register {
  form: FormGroup;
  showPassword = false;
  successMessage = true;
  message = '';

  constructor(private fb: FormBuilder, private auth: Auth, private router: Router) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  clickAnimate(event: Event) {
    const button = event.target as HTMLButtonElement;
    button.classList.add('clicked');
    setTimeout(() => button.classList.remove('clicked'), 200);
  }

  submit() {
    if (this.form.invalid) return;

    const success = this.auth.register(this.form.value);
    this.successMessage = success;

    if (!success) {
      this.message = 'User already exists';
      return;
    }

    this.message = 'Registered successfully!';
    setTimeout(() => this.router.navigate(['/login']), 800);
  }
}
