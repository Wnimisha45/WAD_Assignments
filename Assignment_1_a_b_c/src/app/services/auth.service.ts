import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private storageKey = 'registeredUsers';
  private currentUserKey = 'currentUser';

  constructor() {}

  /** Get all registered users from localStorage */
  private getUsers(): User[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  /** Public method to get all users (for the users list page) */
  getAllUsers(): User[] {
    return this.getUsers();
  }

  /** Save users array to localStorage */
  private saveUsers(users: User[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  /** Register a new user. Returns error message or null on success. */
  register(user: Omit<User, 'id'>): string | null {
    const users = this.getUsers();

    // Check for duplicate email
    if (users.find(u => u.email === user.email)) {
      return 'A user with this email already exists.';
    }

    // Check for duplicate username
    if (users.find(u => u.username === user.username)) {
      return 'This username is already taken.';
    }

    const newUser: User = {
      ...user,
      id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1
    };

    users.push(newUser);
    this.saveUsers(users);
    return null;
  }

  /** Login user. Returns error message or null on success. */
  login(email: string, password: string): string | null {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return 'Invalid email or password.';
    }

    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
    return null;
  }

  /** Get the currently logged-in user */
  getCurrentUser(): User | null {
    const data = localStorage.getItem(this.currentUserKey);
    return data ? JSON.parse(data) : null;
  }

  /** Check if a user is logged in */
  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  /** Logout the current user */
  logout(): void {
    localStorage.removeItem(this.currentUserKey);
  }

  /** Delete a user by ID */
  deleteUser(id: number): void {
    let users = this.getUsers();
    users = users.filter(u => u.id !== id);
    this.saveUsers(users);

    // If the deleted user is currently logged in, log them out
    const current = this.getCurrentUser();
    if (current && current.id === id) {
      this.logout();
    }
  }
}
