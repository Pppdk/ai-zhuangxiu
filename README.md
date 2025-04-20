# 家装梦想家 - 装修小白指导系统

## 项目简介
"家装梦想家"是一款专为装修小白设计的智能引导系统。通过故事化、对话式的体验，帮助用户轻松发现自己的装修需求，确定风格偏好，获得个性化的装修建议。

## 技术栈
- 前端：React + TypeScript
- UI框架：Ant Design
- 动画：Framer Motion
- 状态管理：Redux Toolkit
- 后端：Node.js + Express
- 数据库：MongoDB

## 项目结构
```
renovation_guide/
├── frontend/           # 前端代码
│   ├── src/
│   │   ├── components/  # UI组件
│   │   ├── pages/      # 页面组件
│   │   ├── styles/     # 样式文件
│   │   ├── utils/      # 工具函数
│   │   └── App.tsx     # 主应用
│   └── package.json
├── backend/            # 后端代码
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   └── package.json
└── README.md
```

## 快速开始

### 前端开发
```bash
cd frontend
npm install
npm start
```

### 后端开发
```bash
cd backend
npm install
npm run dev
```

## 主要功能模块

### 1. 温暖开场
- 个性化欢迎页
- 心态准备引导

### 2. 基础情况收集
- 住所类型选择
- 家庭成员构成
- 时间与预算规划

### 3. 痛点探索
- 场景想象引导
- 图片对决选择
- 痛点识别卡片

### 4. 风格偏好探索
- 材质触感偏好
- 色彩情绪选择
- 生活方式映射

### 5. 智能分析与建议
- 需求主题识别
- 个性化风格推荐
- 具体改造建议

## 开发规范

### 代码风格
- 使用ESLint和Prettier保持代码风格一致
- 遵循React最佳实践
- 组件采用函数式编程

### 提交规范
提交信息格式：
```
type(scope): subject

body
```
type类型：
- feat: 新功能
- fix: 修复
- docs: 文档
- style: 格式
- refactor: 重构
- test: 测试
- chore: 构建过程或辅助工具的变动

### 项目进度
- [x] 项目初始化
- [ ] 基础框架搭建
- [ ] 用户引导流程
- [ ] 风格推荐算法
- [ ] 结果展示优化
- [ ] 部署上线

## 联系方式
如有问题或建议，请提交Issue或PR。
