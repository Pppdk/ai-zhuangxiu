import Design from '../models/designModel.js';
import { AppError } from '../utils/errorHandler.js';

// 创建设计方案
export const createDesign = async (req, res, next) => {
  try {
    const design = await Design.create({
      needs: req.body.needsId,
      ...req.body,
    });

    res.status(201).json({
      status: 'success',
      data: {
        design,
      },
    });
  } catch (error) {
    next(error);
  }
};

// 获取设计方案列表
export const getUserDesigns = async (req, res, next) => {
  try {
    const designs = await Design.find()
      .populate('needs')
      .sort('-createdAt');

    res.status(200).json({
      status: 'success',
      results: designs.length,
      data: {
        designs,
      },
    });
  } catch (error) {
    next(error);
  }
};

// 获取单个设计方案详情
export const getDesignById = async (req, res, next) => {
  try {
    const design = await Design.findById(req.params.id).populate('needs');

    if (!design) {
      return next(new AppError('未找到该设计方案', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        design,
      },
    });
  } catch (error) {
    next(error);
  }
};

// 更新设计方案
export const updateDesign = async (req, res, next) => {
  try {
    const design = await Design.findById(req.params.id);

    if (!design) {
      return next(new AppError('未找到该设计方案', 404));
    }

    // 更新设计方案
    Object.assign(design, req.body);
    await design.save();

    res.status(200).json({
      status: 'success',
      data: {
        design,
      },
    });
  } catch (error) {
    next(error);
  }
};

// 删除设计方案
export const deleteDesign = async (req, res, next) => {
  try {
    const design = await Design.findById(req.params.id);

    if (!design) {
      return next(new AppError('未找到该设计方案', 404));
    }

    await design.deleteOne();

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

// 提供反馈
export const provideFeedback = async (req, res, next) => {
  try {
    const design = await Design.findById(req.params.id);

    if (!design) {
      return next(new AppError('未找到该设计方案', 404));
    }

    // 更新反馈
    design.feedback = {
      rating: req.body.rating,
      comments: req.body.comments,
      createdAt: new Date(),
    };

    await design.save();

    res.status(200).json({
      status: 'success',
      data: {
        design,
      },
    });
  } catch (error) {
    next(error);
  }
};
