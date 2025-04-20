# 家装梦想家后端服务

这是"家装梦想家"应用的后端服务，提供用户管理、需求收集和智能设计方案生成等功能。

## 技术栈

- Node.js
- Express.js
- MongoDB
- 智谱 AI GLM-4

## 项目结构

```
src/
├── config/          # 配置文件
│   └── database.js  # 数据库配置
├── controllers/     # 控制器
│   ├── userController.js
│   ├── needsController.js
│   └── designController.js
├── models/          # 数据模型
│   ├── userModel.js
│   ├── needsModel.js
│   └── designModel.js
├── routes/          # 路由
│   ├── userRoutes.js
│   ├── needsRoutes.js
│   └── designRoutes.js
├── services/        # 服务
│   └── zhipuService.js
├── utils/          # 工具函数
│   ├── logger.js
│   ├── errorHandler.js
│   └── authMiddleware.js
└── server.js       # 主服务器文件
```

## 环境要求

- Node.js >= 14.0.0
- MongoDB >= 4.0.0

## 环境变量

创建 `.env` 文件并设置以下环境变量：

```bash
# 数据库配置
MONGODB_URI=你的MongoDB连接字符串

# 服务器配置
PORT=3000
NODE_ENV=development

# JWT配置
JWT_SECRET=你的JWT密钥
JWT_EXPIRES_IN=30d

# 智谱AI配置
ZHIPU_API_KEY=你的智谱AI API密钥
```

## 安装和运行

```bash
# 安装依赖
npm install

# 开发环境运行
npm run dev

# 生产环境运行
npm start
```

## API 文档

### 用户管理

#### 注册用户
- POST /api/users/register
- Body:
  ```json
  {
    "name": "用户名",
    "email": "邮箱",
    "password": "密码"
  }
  ```

#### 用户登录
- POST /api/users/login
- Body:
  ```json
  {
    "email": "邮箱",
    "password": "密码"
  }
  ```

#### 获取用户信息
- GET /api/users/profile
- Headers: Authorization: Bearer {token}

#### 更新用户信息
- PUT /api/users/profile
- Headers: Authorization: Bearer {token}
- Body:
  ```json
  {
    "name": "新用户名",
    "email": "新邮箱"
  }
  ```

### 需求管理

#### 创建需求
- POST /api/needs
- Headers: Authorization: Bearer {token}
- Body:
  ```json
  {
    "basicInfo": {
      "houseType": "apartment",
      "familyMembers": ["父母", "孩子"],
      "duration": 3,
      "budget": 200000
    },
    "painPoints": ["储物空间不足", "采光不好"],
    "roomPreferences": {
      "客厅": 5,
      "主卧": 4,
      "厨房": 5
    },
    "designStyles": ["现代简约", "日式"],
    "customNeeds": "特殊需求描述"
  }
  ```

#### 获取需求列表
- GET /api/needs
- Headers: Authorization: Bearer {token}

#### 获取需求详情
- GET /api/needs/:id
- Headers: Authorization: Bearer {token}

#### 更新需求
- PUT /api/needs/:id
- Headers: Authorization: Bearer {token}
- Body: 同创建需求

#### 删除需求
- DELETE /api/needs/:id
- Headers: Authorization: Bearer {token}

### 设计方案

#### 生成设计方案
- POST /api/designs
- Headers: Authorization: Bearer {token}
- Body:
  ```json
  {
    "needsId": "需求ID"
  }
  ```

#### 获取方案列表
- GET /api/designs
- Headers: Authorization: Bearer {token}

#### 获取方案详情
- GET /api/designs/:id
- Headers: Authorization: Bearer {token}

#### 更新方案
- PUT /api/designs/:id
- Headers: Authorization: Bearer {token}
- Body:
  ```json
  {
    "overview": {
      "title": "方案标题",
      "description": "方案描述",
      "style": "设计风格",
      "estimatedCost": 预估成本,
      "estimatedDuration": 预估工期
    },
    "roomPlans": [
      {
        "room": "房间名称",
        "description": "设计说明",
        "suggestions": ["建议1", "建议2"],
        "materials": [
          {
            "name": "材料名称",
            "type": "材料类型",
            "brand": "品牌",
            "price": 价格
          }
        ],
        "estimatedCost": 房间预算
      }
    ]
  }
  ```

#### 提供反馈
- POST /api/designs/:id/feedback
- Headers: Authorization: Bearer {token}
- Body:
  ```json
  {
    "rating": 5,
    "comments": "反馈内容"
  }
  ```

## 错误处理

所有的错误响应都遵循以下格式：

```json
{
  "status": "error",
  "message": "错误信息",
  "stack": "错误堆栈（仅在开发环境）"
}
```

## 开发指南

1. 遵循 ESLint 和 Prettier 的代码规范
2. 使用 async/await 处理异步操作
3. 使用 try-catch 进行错误处理
4. 保持代码模块化和可维护性
5. 编写清晰的注释和文档

## 安全性

1. 使用 JWT 进行身份验证
2. 密码加密存储
3. 请求验证和清理
4. 错误信息安全处理
5. 环境变量管理

## 性能优化

1. 数据库索引优化
2. 请求缓存
3. 错误日志记录
4. 异步处理大型计算
5. 智能分页加载