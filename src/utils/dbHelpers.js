// utils/dbHelpers.js
import { getDBConnection } from './database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-js'; // for simple hashing, can be replaced with bcrypt


/** -------- Password Hashing -------- */
const hashPassword = (plain) => {
  const salt = 'edubox_salt_v1'; // fixed salt for now
  return CryptoJS.SHA256(plain + salt).toString();
};

/** -------- Auth Functions -------- */
export const createUser = async ({ name, email, password }) => {
  const db = await getDBConnection();
  const hashed = hashPassword(password);
  try {
    const res = await db.executeSql(
      `INSERT INTO users (name, email, password) VALUES (?, ?, ?);`,
      [name, email.toLowerCase(), hashed]
    );
    return res[0].insertId;
  } catch (err) {
    throw err;
  }
};

export const getUserByEmail = async (email) => {
  const db = await getDBConnection();
  const res = await db.executeSql(
    `SELECT * FROM users WHERE email = ? LIMIT 1`,
    [email.toLowerCase()]
  );
  const rows = res[0].rows;
  return rows.length ? rows.item(0) : null;
};

export const loginUser = async (email, password) => {
  const user = await getUserByEmail(email);
  if (!user) return null;
  const hashed = hashPassword(password);
  if (hashed !== user.password) return null;

  // Save user session locally
  await AsyncStorage.setItem(
    'edubox_user',
    JSON.stringify({ id: user.id, email: user.email, name: user.name })
  );

  return user;
};


export const logoutUser = async () => {
  await AsyncStorage.removeItem('edubox_user');
}

export const getCurrentUser = async () => {
  const json = await AsyncStorage.getItem('edubox_user');
  return json ? JSON.parse(json) : null;
};

/** -------- Leaderboard & Progress -------- */
export const saveProgress = async ({ user_id, lesson_id, score, completed = 1 }) => {
  const db = await getDBConnection();

  await db.executeSql(
    `INSERT INTO progress (user_id, lesson_id, score, completed) VALUES (?, ?, ?, ?);`,
    [user_id, lesson_id, score, completed]
  );

  // Update leaderboard
  const res = await db.executeSql(
    `SELECT id, score FROM leaderboard WHERE user_id = ?`,
    [user_id]
  );

  if (res[0].rows.length) {
    const row = res[0].rows.item(0);
    const newScore = row.score + (score || 0);
    await db.executeSql(
      `UPDATE leaderboard SET score = ? WHERE id = ?`,
      [newScore, row.id]
    );
  } else {
    await db.executeSql(
      `INSERT INTO leaderboard (user_id, score) VALUES (?, ?)`,
      [user_id, score || 0]
    );
  }
};

/** -------- Optional Seeding -------- */
export const seedInitialData = async () => {
  const db = await getDBConnection();
  const res = await db.executeSql(`SELECT COUNT(*) as cnt FROM subjects;`);
  const count = res[0].rows.item(0).cnt;
  if (count > 0) return; // already seeded

  await db.executeSql(
    `INSERT INTO subjects (name, description) VALUES (?, ?);`,
    ['Mathematics', 'Basic mathematics for beginners']
  );

  await db.executeSql(
    `INSERT INTO subjects (name, description) VALUES (?, ?);`,
    ['English', 'Basic English lessons']
  );

  // Add sample lessons & quizzes if needed
};

export const verifyUserPassword = async (email, plainPassword) => {
  const user = await getUserByEmail(email);
  if (!user) return false;
  const hashed = hashPassword(plainPassword);
  return hashed === user.password;
};

export const updateUserPassword = async (userId, newPassword) => {
  const db = await getDBConnection();
  const hashed = hashPassword(newPassword);
  try {
    await db.executeSql(`UPDATE users SET password = ? WHERE id = ?;`, [hashed, userId]);
    return true;
  } catch (err) {
    throw err;
  }
};

export const getLeaderboard = async () => {
  const db = await getDBConnection();
  const results = await db.executeSql(
    `SELECT username, points 
     FROM users 
     ORDER BY points DESC 
     LIMIT 20;`
  );

  let leaderboard = [];
  results.forEach(result => {
    for (let i = 0; i < result.rows.length; i++) {
      leaderboard.push(result.rows.item(i));
    }
  });
  return leaderboard;
};

export const getLessons = async (db) => {
  const results = await db.executeSql('SELECT * FROM lessons');
  let lessons = [];
  results.forEach(result => {
    for (let i = 0; i < result.rows.length; i++) {
      lessons.push(result.rows.item(i));
    }
  });
  return lessons;
};

export const insertLesson = async (db, id, title, content) => {
  await db.executeSql(
    'INSERT OR REPLACE INTO lessons (id, title, content) VALUES (?, ?, ?)',
    [id, title, content]
  );
};



export const saveUserScoreOffline = async (userId, subject, points) => {
  try {
    const database = await initDB();
    await database.executeSql(
      `INSERT INTO user_scores (user_id, subject, points) VALUES (?, ?, ?);`,
      [userId, subject, points]
    );
  } catch (error) {
    throw error;
  }
};

// Optionally, add a function to get scores
export const getUserScores = async (userId) => {
  try {
    const database = await initDB();
    const [results] = await database.executeSql(
      `SELECT * FROM user_scores WHERE user_id = ? ORDER BY timestamp DESC;`,
      [userId]
    );

    const scores = [];
    for (let i = 0; i < results.rows.length; i++) {
      scores.push(results.rows.item(i));
    }
    return scores;
  } catch (error) {
    throw error;
  }
};