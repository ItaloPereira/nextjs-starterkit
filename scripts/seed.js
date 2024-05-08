const { db } = require('@vercel/postgres');
const bcrypt = require('bcrypt');

const {
  users,
  // pages,
  // pageContents,
  // pageSettings,
  // pageSections,
} = require('./initial-data');

async function seedUsers(client) {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name VARCHAR(255) NOT NULL,
      business_name VARCHAR(255) NOT NULL,
      access_level INT DEFAULT 0,
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
      INSERT INTO users (id, name, business_name, access_level, email, password)
      VALUES (${user.id}, ${user.name}, ${user.business_name}, ${user.access_level}, ${user.email}, ${hashedPassword})
      ON CONFLICT (email) DO NOTHING;
    `;
  }
  console.log(`Seeded users`);
}

async function seedPages(client) {
  await client.sql`
    CREATE TABLE IF NOT EXISTS pages (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    );
  `;
  console.log(`Created "pages" table`);

  for (const page of pages) {
    await client.sql`
      INSERT INTO pages (id, user_id)
      VALUES (${page.id}, ${page.user_id})
      ON CONFLICT (id) DO NOTHING;
    `;
  }
  console.log(`Seeded pages`);
}

async function seedPageSections(client) {
  await client.sql`
    CREATE TABLE IF NOT EXISTS page_sections (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      page_id UUID NOT NULL,
      type VARCHAR(50),
      section_order INT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (page_id) REFERENCES pages (id)
    );
  `;
  console.log(`Created "page_sections" table`);

  for (const section of pageSections) {
    await client.sql`
      INSERT INTO page_sections (id, page_id, type, section_order)
      VALUES (${section.id}, ${section.page_id}, ${section.type}, ${section.section_order})
      ON CONFLICT (id) DO NOTHING;
    `;
  }
  console.log(`Seeded page sections`);
}

async function seedPageSettings(client) {
  await client.sql`
    CREATE TABLE IF NOT EXISTS page_settings (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      page_id UUID NOT NULL,
      theme VARCHAR(255),
      primary_color VARCHAR(255),
      title VARCHAR(255),
      logo_url VARCHAR(255),
      featured_img_url VARCHAR(2048),
      featured_text VARCHAR(2048),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (page_id) REFERENCES pages (id)
    );
  `;
  console.log(`Created "page_settings" table`);

  for (const setting of pageSettings) {
    await client.sql`
      INSERT INTO page_settings (id, page_id, theme, primary_color, title, logo_url, featured_img_url, featured_text)
      VALUES (${setting.id}, ${setting.page_id}, ${setting.theme}, ${setting.primary_color}, ${setting.title}, ${setting.logo_url}, ${setting.featured_img_url}, ${setting.featured_text})
      ON CONFLICT (id) DO NOTHING;
    `;
  }
  console.log(`Seeded page settings`);
}

async function seedPageContents(client) {
  await client.sql`
    CREATE TABLE IF NOT EXISTS page_contents (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      page_id UUID NOT NULL,
      section_id UUID NOT NULL,
      type VARCHAR(50),
      data TEXT,
      content_order INT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (page_id) REFERENCES pages (id),
      FOREIGN KEY (section_id) REFERENCES page_sections (id)
    );
  `;
  console.log(`Created "page_contents" table`);

  for (const content of pageContents) {
    await client.sql`
      INSERT INTO page_contents (id, page_id, section_id, type, data, content_order)
      VALUES (uuid_generate_v4(), ${content.page_id}, ${content.section_id}, ${content.type}, ${content.data}, ${content.content_order})
      ON CONFLICT (id) DO NOTHING;
    `;
  }
  console.log(`Seeded page contents`);
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  // await seedPages(client);
  // await seedPageSettings(client);
  // await seedPageSections(client);
  // await seedPageContents(client);

  await client.end();
}

main().catch((err) => {
  console.error('An error occurred while attempting to seed the database:', err);
});
