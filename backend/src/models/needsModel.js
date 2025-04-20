import mongoose from 'mongoose';

const needsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, '请输入需求标题'],
      trim: true,
    },
    basicInfo: {
      houseType: {
        type: String,
        required: [true, '请选择住所类型'],
      },
      familyMembers: {
        type: [String],
        required: [true, '请选择家庭成员'],
      },
      duration: {
        type: Number,
        required: [true, '请选择装修时长'],
        min: 1,
        max: 24,
      },
      budget: {
        type: Number,
        required: [true, '请设置装修预算'],
        min: 50000,
        max: 10000000,
      },
    },
    roomInfo: [{
      name: {
        type: String,
        required: [true, '请输入房间名称'],
      },
      area: {
        type: Number,
        required: [true, '请输入房间面积'],
        min: 1,
        max: 200,
      },
      requirements: {
        type: [String],
        required: [true, '请输入房间需求'],
      },
    }],
    stylePreference: {
      style: {
        type: String,
        required: [true, '请选择设计风格'],
      },
      colors: {
        type: [String],
        required: [true, '请选择颜色偏好'],
      },
      materials: {
        type: [String],
        required: [true, '请选择材料偏好'],
      },
    },
    additionalRequirements: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['draft', 'submitted', 'processing', 'completed'],
      default: 'draft',
    },
  },
  {
    timestamps: true,
  }
);

// 创建索引
needsSchema.index({ createdAt: -1 });

const Needs = mongoose.model('Needs', needsSchema);

export default Needs;
