import jwt from 'jsonwebtoken';
import { AppError } from './errorHandler.js';
import User from '../models/userModel.js';

export const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError('请先登录以访问此资源', 401));
    }

    // 验证 token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 检查用户是否仍然存在
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new AppError('此用户不存在', 401));
    }

    // 将用户信息添加到请求对象
    req.user = user;
    next();
  } catch (error) {
    next(new AppError('认证失败', 401));
  }
};

// 限制特定角色访问
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('您没有权限执行此操作', 403));
    }
    next();
  };
};
