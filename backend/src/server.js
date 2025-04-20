import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app.js';

// 加载环境变量
dotenv.config();

const port = process.env.PORT || 3001;

// 连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/renovation_guide')
  .then(() => {
    console.log('数据库连接成功');
    app.listen(port, () => {
      console.log(`服务器运行在 http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('数据库连接失败:', err);
    process.exit(1);
  });
