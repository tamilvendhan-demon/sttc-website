// Minimal mock helpers to simulate Firebase behavior for the demo.
export function getDemoUser() {
  return {
    uid: 'demo-artisan-1',
    email: 'lakshmi@example.com',
    displayName: 'Lakshmi Crafts',
    role: 'ARTISAN'
  };
}

export function isAdmin(user:any) { return user?.role === 'ADMIN'; }
