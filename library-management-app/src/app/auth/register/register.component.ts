import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth.service';
import { User } from '../../models/user.model';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage = ''; 

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['user', Validators.required],
    });
    
  }

  register(): void {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Please fill in all fields correctly';
      return;
    }
  
    const formValue = this.registerForm.value;
    const newUser: User = {
      id: Date.now(),
      name: formValue.name,
      email: formValue.email,
      password: formValue.password,
      role: formValue.role,
    };
  
    const registered = this.authService.register(newUser);
  
    if (registered) {
      this.router.navigate(['/auth/login']);
    } else {
      this.errorMessage = 'Email already exists!';
    }
  }  
  
  
  clickLogin() {
    this.router.navigate(['/auth/login']);
  }
  
}
