import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input, Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import '../styles/welcome.css';

interface WelcomePageProps {
  onComplete: (name: string) => void;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const [showMessage, setShowMessage] = useState(true);

  const handleStart = () => {
    setShowMessage(false);
    setShowNameInput(true);
  };

  const handleNameSubmit = () => {
    if (name.trim()) {
      onComplete(name.trim());
    }
  };

  return (
    <div className="welcome-container">
      <motion.div
        className="welcome-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="house-icon"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <HomeOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
        </motion.div>

        {showMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h1>欢迎来到家装梦想家</h1>
            <p>让我们一起打造你的理想家居</p>
            <Button type="primary" size="large" onClick={handleStart}>
              开始探索
            </Button>
          </motion.div>
        )}

        {showNameInput && (
          <motion.div
            className="name-input-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2>很高兴认识你</h2>
            <p>请问该如何称呼你呢？</p>
            <Input
              size="large"
              placeholder="输入你的名字"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ marginBottom: '20px' }}
            />
            <Button
              type="primary"
              size="large"
              onClick={handleNameSubmit}
              disabled={!name.trim()}
            >
              继续
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
