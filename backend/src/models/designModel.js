import mongoose from 'mongoose';

const materialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const roomPlanSchema = new mongoose.Schema({
  room: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  suggestions: {
    type: [String],
    required: true,
  },
  materials: {
    type: [materialSchema],
    required: true,
  },
  estimatedCost: {
    type: Number,
    required: true,
  },
});

const feedbackSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comments: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const designSchema = new mongoose.Schema(
  {
    needs: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Needs',
      required: true,
    },
    overview: {
      title: {
        type: String,
        required: true,
      },
      style: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      estimatedCost: {
        type: Number,
        required: true,
      },
      estimatedDuration: {
        type: Number,
        required: true,
      },
    },
    roomPlans: {
      type: [roomPlanSchema],
      required: true,
    },
    version: {
      type: Number,
      default: 1,
    },
    feedback: feedbackSchema,
    status: {
      type: String,
      enum: ['draft', 'submitted', 'approved', 'rejected'],
      default: 'draft',
    },
  },
  {
    timestamps: true,
  }
);

// 创建索引
designSchema.index({ createdAt: -1 });
designSchema.index({ needs: 1 });

const Design = mongoose.model('Design', designSchema);

export default Design;
