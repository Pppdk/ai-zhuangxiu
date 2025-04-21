import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Typography, Input, Button, Space } from 'antd';
import { RightOutlined, SmileOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import PageTransition from '../../components/PageTransition';

const { Title, Text } = Typography;

const WelcomeContainer = styled(motion.div)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: linear-gradient(135deg, #fff5f5 0%, #fff 100%);
`;

const ContentBox = styled(motion.div)`
  max-width: 600px;
  width: 100%;
  text-align: center;
`;

const StyledInput = styled(Input)`
  width: 300px;
  height: 50px;
  font-size: 18px;
  border-radius: 25px;
  text-align: center;
  margin: 24px 0;
`;

const StyledButton = styled(Button)`
  height: 50px;
  padding: 0 32px;
  font-size: 18px;
  border-radius: 25px;
`;

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const handleContinue = () => {
    if (name.trim()) {
      localStorage.setItem('userName', name.trim());
      navigate('/onboarding/basic-info');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleContinue();
    }
  };

  return (
    <PageTransition>
      <WelcomeContainer>
        <ContentBox
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Title level={1}>
              欢迎来到家装梦想家
              <SmileOutlined style={{ marginLeft: 8, color: '#1890ff' }} />
            </Title>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Text style={{ fontSize: 18, color: '#666' }}>
              让我们开始打造你的理想家居空间吧！
              <br />
              首先，告诉我该如何称呼你？
            </Text>
          </motion.div>

          <motion.div variants={itemVariants}>
            <StyledInput
              placeholder="输入你的名字"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={handleKeyPress}
              autoFocus
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Space size="large">
              <StyledButton
                type="primary"
                icon={<RightOutlined />}
                onClick={handleContinue}
                disabled={!name.trim()}
              >
                开始探索
              </StyledButton>
            </Space>
          </motion.div>

          <motion.div
            variants={itemVariants}
            style={{ marginTop: 48 }}
          >
            <Text type="secondary">探索之旅：1/5</Text>
          </motion.div>
        </ContentBox>
      </WelcomeContainer>
    </PageTransition>
  );
};

export default Welcome;
