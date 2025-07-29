import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth.service';
import { User } from '../../models/user.model';

@Component({
  standalone: true,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  user!: User | null;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    if (this.user) {
      this.profileForm = this.fb.group({
        name: [this.user.name, Validators.required],
        email: [this.user.email, [Validators.required, Validators.email]],
        role: [{ value: this.user.role, disabled: true }]
      });
    }
  }

  updateProfile(): void {
    if (this.profileForm.invalid || !this.user) return;

    const updatedUser: User = {
      ...this.user,
      name: this.profileForm.value.name,
      email: this.profileForm.value.email
    };

    const success = this.authService.updateUser(updatedUser);
    if (success) {
      alert('Profile updated successfully!');
    } else {
      alert('Failed to update profile.');
    }
  }
}
