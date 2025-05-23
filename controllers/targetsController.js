const targets = require("../Models/targetsModel");


exports.setMonthTarget = async ( req, res ) => {

    const monthNameToNumber = {
        January: 1, February: 2, March: 3, April: 4,
        May: 5, June: 6, July: 7, August: 8,
        September: 9, October: 10, November: 11, December: 12
      };

    try {
        const {target_month, target_year, monthly_budjet} = req.body;

        const result = await targets.MonthlyTarget(monthNameToNumber[target_month], target_year, monthly_budjet);
        console.log(monthNameToNumber[target_month]);
        
        res.status(201).json({ message: 'month target set', data: result }); 
    } catch (error) {
        console.error('Error sending message:', err);
        res.status(500).json({ message: 'month target not set', data: result }); 
    }
   
    
};

exports.setIncentive = async (req, res) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    
    const currentYear = now.getFullYear(); 

    const {incentive, out_of_stock, daily_budget, Day_num} = req.body;

    try {
        const result = await targets.DailyIncentive(incentive, out_of_stock, daily_budget, Day_num);
        
        res.status(200).json( result );  
    } catch (error) {
      console.log("msg of error: " ,error);
      res.status(500).json({ message: 'month target not set', data: result }); 
        
    }
};