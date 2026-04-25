// Utility functions for mock authentication using localStorage

const USERS_KEY = 'finsight_users';
const CURRENT_USER_KEY = 'finsight_current_user';

export const auth = {
  getUsers: () => {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  },

  signup: (name, email, password) => {
    const users = auth.getUsers();
    if (users.find(u => u.email === email)) {
      throw new Error('User with this email already exists');
    }
    const newUser = { id: Date.now().toString(), name, email, password };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return true;
  },

  login: (email, password) => {
    const users = auth.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    // Omit password from session
    const { password: _, ...userSession } = user;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userSession));
    return userSession;
  },

  logout: () => {
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  getCurrentUser: () => {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem(CURRENT_USER_KEY);
  }
};
