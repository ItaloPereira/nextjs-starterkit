const { db } = require('@vercel/postgres');
const bcrypt = require('bcrypt');

const {
  users,
} = require('./initial-data');

async function seedUsers(client) {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  console.log(`Created "users" table`);

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await client.sql`
      INSERT INTO users (id, first_name, last_name, email, password)
      VALUES (${user.id}, ${user.first_name}, ${user.last_name}, ${user.email}, ${hashedPassword})
      ON CONFLICT (email) DO NOTHING;
    `;
  }
  console.log(`Seeded users`);
}

async function seedEvents(client) {
  await client.sql`
    CREATE TABLE IF NOT EXISTS events (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID NOT NULL,
      name VARCHAR(255) NOT NULL,
      date DATE NOT NULL,
      location VARCHAR(255) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    );
  `;

  console.log(`Created "events" table`);
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedEvents(client);

  await client.end();
}

main().catch((err) => {
  console.error('An error occurred while attempting to seed the database:', err);
});
