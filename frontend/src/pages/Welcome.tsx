import React from 'react';
import { Button, Typography, Space, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/welcome.css';

const { Title, Paragraph } = Typography;

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="welcome-content"
      >
        <Title>欢迎来到家装梦想家</Title>
        <Paragraph>
          让 AI 助你打造理想的居住空间，从这里开始你的家装之旅
        </Paragraph>

        <Space size="large">
          <Button type="primary" size="large" onClick={() => navigate('/register')}>
            立即开始
          </Button>
          <Button size="large" onClick={() => navigate('/login')}>
            已有账号？登录
          </Button>
        </Space>

        <div className="feature-cards">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Card title="智能设计" className="feature-card">
              基于您的需求和偏好，AI 自动生成个性化的装修方案
            </Card>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Card title="预算控制" className="feature-card">
              精确估算装修成本，帮您合理规划装修预算
            </Card>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Card title="风格推荐" className="feature-card">
              根据您的喜好，推荐最适合的装修风格和搭配方案
            </Card>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Card title="空间优化" className="feature-card">
              科学规划空间布局，提升居住体验和储物功能
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Welcome;
