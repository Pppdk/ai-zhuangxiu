import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Typography, Input, Button, Space } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

const { Title, Text } = Typography;

const WelcomeContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #fff5f5 0%, #fff 100%);
  padding: 24px;
`;

const ContentBox = styled(motion.div)`
  max-width: 600px;
  width: 100%;
  text-align: center;
  background: rgba(255, 255, 255, 0.9);
  padding: 48px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
`;

const AnimatedHouse = styled(motion.div)`
  font-size: 64px;
  margin-bottom: 24px;
`;

const StyledInput = styled(Input)`
  max-width: 300px;
  margin: 24px auto;
  height: 40px;
  border-radius: 20px;
  text-align: center;
  font-size: 16px;
`;

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const houseVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        delay: 0.2
      }
    }
  };

  const handleContinue = () => {
    if (name) {
      localStorage.setItem('userName', name);
      navigate('/onboarding/basic-info');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && name) {
      handleContinue();
    }
  };

  return (
    <WelcomeContainer>
      <ContentBox
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatedHouse
          variants={houseVariants}
          initial="hidden"
          animate="visible"
        >
          🏠
        </AnimatedHouse>

        <Title level={2} style={{ marginBottom: 16 }}>
          你好！准备开始家装之旅了吗？
        </Title>

        <Text style={{ fontSize: 16, color: '#666' }}>
          很多人第一次装修都感到迷茫，这很正常。
          <br />
          接下来的10分钟，我们将一起探索你理想中的家。
          <br />
          无需专业知识，只需跟随感觉选择。
        </Text>

        <StyledInput
          placeholder="请问如何称呼你？"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={handleKeyPress}
          size="large"
        />

        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Text type="secondary">
            探索之旅：1/5
          </Text>

          <Button
            type="primary"
            size="large"
            icon={<RightOutlined />}
            onClick={handleContinue}
            disabled={!name}
            style={{
              height: 48,
              borderRadius: 24,
              fontSize: 16,
              width: 200
            }}
          >
            开始探索
          </Button>
        </Space>
      </ContentBox>
    </WelcomeContainer>
  );
};

export default Welcome;
