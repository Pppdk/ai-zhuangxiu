import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import needsRoutes from './routes/needsRoutes.js';
import designRoutes from './routes/designRoutes.js';
import { errorHandler } from './utils/errorHandler.js';

const app = express();

// 中间件
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// 路由
app.use('/api/needs', needsRoutes);
app.use('/api/designs', designRoutes);

// 根路由
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: '装修指南 API 服务正在运行',
  });
});

// 错误处理
app.use(errorHandler);

// 处理 404
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: `无法找到路径: ${req.originalUrl}`,
  });
});

export default app;
