// utils/database.js
import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const dbName = 'edubox.db';

// Open a DB connection
export const getDBConnection = async () => {
  try {
    return await SQLite.openDatabase({ name: dbName, location: 'default' });
  } catch (error) {
    console.error('❌ Failed to open DB:', error);
    throw error;
  }
};

// Close DB connection (optional)
export const closeDBConnection = async (db) => {
  if (db) {
    try {
      await db.close();
      console.log('📁 Database connection closed.');
    } catch (error) {
      console.error('❌ Error closing DB connection:', error);
    }
  }
};

// Initialize database schema
export const initDB = async () => {
  const db = await getDBConnection();

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      level INTEGER DEFAULT 1,
      last_subject TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS subjects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT
    );
  `);

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS lessons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      subject_id INTEGER,
      title TEXT NOT NULL,
      content TEXT,
      conclusion TEXT,
      FOREIGN KEY (subject_id) REFERENCES subjects(id)
    );
  `);

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS quizzes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lesson_id INTEGER,
      question TEXT NOT NULL,
      options TEXT NOT NULL,
      answer TEXT NOT NULL,
      FOREIGN KEY (lesson_id) REFERENCES lessons(id)
    );
  `);

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      lesson_id INTEGER,
      score INTEGER,
      completed INTEGER DEFAULT 0,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (lesson_id) REFERENCES lessons(id)
    );
  `);

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS leaderboard (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      score INTEGER DEFAULT 0,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `);

  await db.executeSql(`
  CREATE TABLE IF NOT EXISTS agric_topics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL
  );
`);

await db.executeSql(`
  CREATE TABLE IF NOT EXISTS biology_topics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL
  );
`);

await db.executeSql(`
  CREATE TABLE IF NOT EXISTS chemistry_topics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL
  );
`);

await db.executeSql(`
  CREATE TABLE IF NOT EXISTS english_topics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL
  );
`);

await db.executeSql(`
  CREATE TABLE IF NOT EXISTS maths_topics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL
  );
`);

await db.executeSql(`
  CREATE TABLE IF NOT EXISTS physics_topics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL
  );
`);

await db.executeSql(`
    CREATE TABLE IF NOT EXISTS user_scores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT,
      subject TEXT,
      points INTEGER,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);


  console.log('✅ Database initialized');
  return db;
};
