const { query } = require('../config/database');
const bcrypt = require('bcrypt');

/**
 * User Model - Handles all user-related database operations
 */
class UserModel {
  /**
   * Create a new user
   * @param {Object} userData - User data (username, email, password)
   * @returns {Object} Created user
   */
  static async createUser(userData) {
    const { username, email, password, role = 'user' } = userData;
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);
    
    // Insert user into database
    const sql = `
      INSERT INTO users (username, email, password_hash, role)
      VALUES (?, ?, ?, ?)
    `;
    
    const result = await query(sql, [username, email, password_hash, role]);
    
    // Return user data (without password)
    return {
      id: result.insertId,
      username,
      email,
      role
    };
  }
  
  /**
   * Find a user by email
   * @param {String} email - User email
   * @returns {Object|null} User data or null if not found
   */
  static async findByEmail(email) {
    try {
      const sql = `
        SELECT id, username, email, password_hash, role
        FROM users
        WHERE LOWER(email) = LOWER(?)
      `;
      
      const users = await query(sql, [email]);
      
      // Return first user or null
      return users.length > 0 ? users[0] : null;
    } catch (error) {
      console.error('Error finding user by email:', error.message);
      throw error;
    }
  }

  /**
   * Find a user by username (case-insensitive)
   * @param {string} username - The username to search for
   * @returns {Promise<Object|null>} - The user object or null if not found
   */
  static async findByUsername(username) {
    try {
      const sql = `
        SELECT id, username, email, password_hash, role
        FROM users
        WHERE LOWER(username) = LOWER(?)
      `;
      
      const users = await query(sql, [username]);
      
      return users.length > 0 ? users[0] : null;
    } catch (error) {
      console.error('Error finding user by username:', error.message);
      throw error;
    }
  }
  
  /**
   * Find a user by ID
   * @param {Number} id - User ID
   * @returns {Object|null} User data or null if not found
   */
  static async findById(id) {
    const sql = `
      SELECT id, username, email, role, created_at, updated_at
      FROM users
      WHERE id = ?
    `;
    
    const users = await query(sql, [id]);
    
    // Return first user or null
    return users.length > 0 ? users[0] : null;
  }
  
  /**
   * Update a user's information
   * @param {Number} id - User ID
   * @param {Object} userData - User data to update
   * @returns {Boolean} Success status
   */
  static async updateUser(id, userData) {
    // Extract updatable fields
    const { username, email } = userData;
    
    const sql = `
      UPDATE users
      SET username = ?, email = ?
      WHERE id = ?
    `;
    
    const result = await query(sql, [username, email, id]);
    
    return result.affectedRows > 0;
  }
  
  /**
   * Update a user's password
   * @param {Number} id - User ID
   * @param {String} newPassword - New password
   * @returns {Boolean} Success status
   */
  static async updatePassword(id, newPassword) {
    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(newPassword, salt);
    
    const sql = `
      UPDATE users
      SET password_hash = ?
      WHERE id = ?
    `;
    
    const result = await query(sql, [password_hash, id]);
    
    return result.affectedRows > 0;
  }
  
  /**
   * Check if a user exists by email
   * @param {String} email - User email
   * @returns {Boolean} True if user exists
   */
  static async exists(email) {
    try {
      const sql = `
        SELECT COUNT(*) as count
        FROM users
        WHERE LOWER(email) = LOWER(?)
      `;
      
      const result = await query(sql, [email]);
      
      return result[0].count > 0;
    } catch (error) {
      console.error('Error checking if user exists:', error.message);
      throw error;
    }
  }
  
  /**
   * Get all users (for admin)
   * @param {Number} limit - Maximum number of users to return
   * @param {Number} offset - Offset for pagination
   * @returns {Array} List of users
   */
  static async getAllUsers(limit = 10, offset = 0) {
    const sql = `
      SELECT id, username, email, role, created_at, updated_at
      FROM users
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `;
    
    return await query(sql, [limit, offset]);
  }
  
  /**
   * Verify a user's password
   * @param {String} password - Plain text password
   * @param {String} hashedPassword - Hashed password from database
   * @returns {Boolean} True if password matches
   */
  static async verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
}

module.exports = UserModel;

