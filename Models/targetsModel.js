const { json } = require('express');

const db = require('../config/db').promise();


const targets = {

    MonthlyTarget: async (target_month, target_year, monthly_budjet) => {
          const sql = `INSERT INTO monthly_targets (target_month, target_year, monthly_budget) VALUES (?, ?, ?)`;
          const checksql = 'SELECT * FROM monthly_targets WHERE target_month = ? AND target_year = ?';
          try {
            const [check] = await db.query(checksql,[target_month , target_year]);

            if (check.length > 0) {
              return {msg :"target set"};
            }
            
            const [result] = await db.query(sql, [target_month, target_year, monthly_budjet]); 
            console.log(target_month);
            
            return result;
          } catch (error) {
            return console.log("failed insertion :" ,error);
          }

      },

      findByMonthYear: (month, year, callback) => {
        const sql = `SELECT * FROM monthly_targets WHERE month = ? AND year = ?`;
        db.query(sql, [month, year], callback);
      },

      DailyIncentive: async (incentive, out_of_stock, daily_budget, Day_num) => {
          const sql = `INSERT INTO daily_targets (incentive, out_of_stock, daily_budget, Day_num, monthly_id) VALUES (?, ?, ?, ?, ?)`;
          const sql2 = 'SELECT target_month FROM monthly_targets';
          const checksql2 = 'SELECT * FROM daily_target WHERE Day_num = ?';

          db.query(checksql2,[Day_num] async (params) => {
            
          });
          

          try {
            const [res] = await db.query(sql2);
            const ress = res[res.length - 1];
            const monthly_id = ress["target_month"];
            const [result] = await db.query(sql, [incentive, JSON.stringify(out_of_stock), daily_budget, Day_num, monthly_id]);
            return result;
          } catch (error) {
            console.log("daily incentive data failed " ,error);
            
          }
        },

     findByDate: (date, callback) => {
            const sql = `SELECT * FROM daily_incentives WHERE date = ?`;
            db.query(sql, [date], callback);
          } , 

      OutOfStockItem: async () => {

          const { item_name, date_reported } = data;
          const sql = `INSERT INTO out_of_stock_items (item_name, date_reported) VALUES (?, ?)`;
          const [result] = await db.query(sql, [item_name, date_reported]);
        
          try {
            const [result] = await db.query(sql, [item_name, date_reported]);
            console.log("done: ", result);
            
          } catch (error) {
            return console.log(error);
            
          }
        }

};

module.exports =  targets;