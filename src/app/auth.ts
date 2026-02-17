import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private USERS_KEY = 'users';
  private SESSION_KEY = 'session_user';

  register(user: any): boolean {
    const users = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');

    const exists = users.find((u: any) => u.email === user.email);
    if (exists) return false;

    users.push(user);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    return true;
  }

 login(email: string, password: string): boolean {
  const users = JSON.parse(localStorage.getItem('users') || '[]');

  const user = users.find(
    (u: any) => u.email === email && u.password === password
  );

  if (!user) return false;

  localStorage.setItem('session_user', JSON.stringify(user));
  return true;
}



  getCurrentUser() {
    return JSON.parse(localStorage.getItem(this.SESSION_KEY) || 'null');
  }

  logout() {
    localStorage.removeItem(this.SESSION_KEY);
  }
}
