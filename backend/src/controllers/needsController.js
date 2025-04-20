import Needs from '../models/needsModel.js';
import { AppError } from '../utils/errorHandler.js';

// 创建需求
export const createNeeds = async (req, res, next) => {
  try {
    const needs = await Needs.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        needs,
      },
    });
  } catch (error) {
    next(error);
  }
};

// 获取需求列表
export const getUserNeeds = async (req, res, next) => {
  try {
    const needs = await Needs.find().sort('-createdAt');

    res.status(200).json({
      status: 'success',
      results: needs.length,
      data: {
        needs,
      },
    });
  } catch (error) {
    next(error);
  }
};

// 获取单个需求详情
export const getNeedsById = async (req, res, next) => {
  try {
    const needs = await Needs.findById(req.params.id);

    if (!needs) {
      return next(new AppError('未找到该需求', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        needs,
      },
    });
  } catch (error) {
    next(error);
  }
};

// 更新需求
export const updateNeeds = async (req, res, next) => {
  try {
    const needs = await Needs.findById(req.params.id);

    if (!needs) {
      return next(new AppError('未找到该需求', 404));
    }

    // 更新需求
    Object.assign(needs, req.body);
    await needs.save();

    res.status(200).json({
      status: 'success',
      data: {
        needs,
      },
    });
  } catch (error) {
    next(error);
  }
};

// 删除需求
export const deleteNeeds = async (req, res, next) => {
  try {
    const needs = await Needs.findById(req.params.id);

    if (!needs) {
      return next(new AppError('未找到该需求', 404));
    }

    await needs.deleteOne();

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
