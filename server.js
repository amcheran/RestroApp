const db = require('./config/db.js');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messagesRoute');
const TargetRoutes = require('./routes/TargetRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/set_month_target', TargetRoutes);
app.use('/api/set_Incentive', TargetRoutes);

app.get('/', (req, res) => {
  res.send('Restaurant App Backend Running 🚀');
});

app.listen(PORT, () => {
  console.log(`Server is rnning on http://localhost:${PORT}`);
});
