const { connect } = require('../routes/authRoutes');

// models/messageModel.js
const db = require('../config/db').promise();

const Message = {

  create : async (sender_id, content) => {
    const sql = 'INSERT INTO chat (sender_id, content) VALUES (?, ?)';
    try {
      const [result] = await db.query(sql, [sender_id, content]);
      return result;
    }catch (err){
      console.log(err);
      
    }
  },
   
  getAllMessagesForUser: (userId, callback) => {
    const sql = `
      SELECT m.id, m.sender_id, m.receiver_id, m.message, m.timestamp,
             sender.name AS sender_name,
             receiver.name AS receiver_name
      FROM messages m
      LEFT JOIN users sender ON m.sender_id = sender.id
      LEFT JOIN users receiver ON m.receiver_id = receiver.id
      WHERE m.sender_id = ?
         OR m.receiver_id = ?
         OR m.receiver_id IS NULL
      ORDER BY m.timestamp ASC
    `;
    db.query(sql, [userId, userId], callback);
  },


  getBroadcast: async () => {
    const sql = `
    SELECT m.id, m.sender_id, m.content, m.created_at,
           sender.name AS sender_name
    FROM chat m
    JOIN users sender ON m.sender_id = sender.id
    WHERE m.receiver_id IS NULL
    ORDER BY m.created_at ASC
  `;
    try{
      const [result] = await db.query(sql);
      
      console.log("working", result);
      
      return result;
    }catch (err){
      return err;
      
    }
  }
};

module.exports = Message;
