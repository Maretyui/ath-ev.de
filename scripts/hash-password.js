// Usage: node scripts/hash-password.js <password>
// Generates a bcrypt hash to insert into the admin_users table

const bcrypt = require('bcryptjs');

const password = process.argv[2];

if (!password) {
  console.log('Usage: node scripts/hash-password.js <password>');
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 12);
console.log(`Password: ${password}`);
console.log(`Hash: ${hash}`);
console.log('');
console.log(`SQL: INSERT INTO admin_users (email, password_hash, role) VALUES ('user@example.com', '${hash}', 'manager');`);
