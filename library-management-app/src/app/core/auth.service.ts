import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User | null = null;

  constructor(private router: Router) {}

  login(email: string, password: string): boolean {
    const userData = localStorage.getItem('users');
    const users: User[] = userData ? JSON.parse(userData) : [];
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      this.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }

    return false;
  }

  register(user: User): boolean {
    if (!user || !user.email) {
      return false;
    }
  
    const usersData = localStorage.getItem('users');
    const users: User[] = usersData ? JSON.parse(usersData) : [];
  
    const existingUser = users.find(u => u.email === user.email);
    if (existingUser) {
      return false;
    }
  
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }
  
  

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    this.router.navigate(['/auth/login']);
  }

  isAdmin(): boolean {
    return this.getCurrentUser()?.role === 'admin';
  }

  isUser(): boolean {
    return this.getCurrentUser()?.role === 'user';
  }

  getUserRole(): string | null {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    return user?.role || null;
  }

  getCurrentUser(): User | null {
    if (typeof localStorage === 'undefined') return null;
  
    const userJson = localStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
  }
  
  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }
   
  updateUser(updatedUser: User): boolean {
    const usersData = localStorage.getItem('users');
    const users: User[] = usersData ? JSON.parse(usersData) : [];
  
    const index = users.findIndex(u => u.email === this.currentUser?.email);
    if (index === -1) return false;
  
    users[index] = { ...users[index], ...updatedUser };
    localStorage.setItem('users', JSON.stringify(users));
  
    this.currentUser = users[index];
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
  
    return true;
  }
  
}
