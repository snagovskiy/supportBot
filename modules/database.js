// Функции для работы с базой данных D1

// Кэш для текстов
let textsCache = null;
let cacheTimestamp = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 минут

export class TextDatabase {
  constructor(env) {
    this.db = env.DB;
  }

  // Получить текст по ключу
  async getText(key) {
    try {
      const stmt = this.db.prepare('SELECT content FROM texts WHERE key = ?');
      const result = await stmt.bind(key).first();
      return result ? result.content : null;
    } catch (error) {
      console.error('Error getting text from database:', error);
      return null;
    }
  }

  // Получить все тексты за один запрос
  async getAllTexts() {
    try {
      const stmt = this.db.prepare('SELECT key, content FROM texts');
      const results = await stmt.all();
      
      const texts = {};
      if (results.results) {
        results.results.forEach(row => {
          texts[row.key] = row.content;
        });
      }
      return texts;
    } catch (error) {
      console.error('Error getting all texts from database:', error);
      return {};
    }
  }

  // Получить несколько текстов по ключам
  async getTexts(keys) {
    try {
      const placeholders = keys.map(() => '?').join(',');
      const stmt = this.db.prepare(
        `SELECT key, content FROM texts WHERE key IN (${placeholders})`
      );
      const result = await stmt.bind(...keys).all();
      
      const texts = {};
      if (result.results) {
        result.results.forEach(row => {
          texts[row.key] = row.content;
        });
      }
      return texts;
    } catch (error) {
      console.error('Error getting multiple texts:', error);
      return {};
    }
  }
}

export async function getTextsWithCache(env) {
  const now = Date.now();
  
  if (!textsCache || (now - cacheTimestamp) > CACHE_TTL) {
    const db = new TextDatabase(env);
    textsCache = await db.getAllTexts();
    cacheTimestamp = now;
    console.log('Texts cache updated');
  }
  
  return textsCache;
}

export function clearTextsCache() {
  textsCache = null;
  cacheTimestamp = 0;
  console.log('Texts cache cleared');
}