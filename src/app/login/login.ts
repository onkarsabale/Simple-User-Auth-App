import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html'
})

export class Login {
  form: FormGroup;
  showPassword = false;
  successMessage = true;
  message = '';

  constructor(private fb: FormBuilder, private auth: Auth, private router: Router) {
    this.form = this.fb.group({
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

    const success = this.auth.login(this.form.value.email, this.form.value.password);
    this.successMessage = success;

    if (!success) {
      this.message = 'Invalid credentials';
      return;
    }

    this.message = 'Login successful!';
    setTimeout(() => this.router.navigate(['/profile']), 800);
  }
}
