import React from 'react';
import { Typography, Space } from 'antd';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

const { Text } = Typography;

const MessageContainer = styled(motion.div)`
  margin: 16px 0;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 12px;
  border-left: 4px solid #1890ff;
`;

interface EmotionalMessageProps {
  type: 'welcome' | 'encouragement' | 'completion' | 'suggestion';
  userName?: string;
  message?: string;
}

type MessageContent = {
  title: string;
  content: string;
};

type MessageFunction = (name?: string) => MessageContent;

const messages: Record<EmotionalMessageProps['type'], MessageFunction | MessageContent> = {
  welcome: (name?: string) => ({
    title: `${name ? `${name}，` : ''}欢迎开启你的理想家居之旅 🏡`,
    content: '让我们一起描绘属于你的完美生活空间...'
  }),
  encouragement: {
    title: '做得很棒！🌟',
    content: '每一个选择都在让我们更了解你的需求和偏好...'
  },
  completion: (name?: string) => ({
    title: `太棒了！${name ? `${name}，` : ''}我们完成了所有规划 🎉`,
    content: '让我们看看为你量身定制的完美方案吧！'
  }),
  suggestion: {
    title: '需要帮助吗？💡',
    content: '记住，这里没有对错答案，重要的是你的感受和需求...'
  }
};

export const EmotionalMessage: React.FC<EmotionalMessageProps> = ({
  type,
  userName,
  message
}) => {
  const getContent = (): MessageContent => {
    if (message) {
      return {
        title: message,
        content: ''
      };
    }
    
    const messageContent = messages[type];
    if (typeof messageContent === 'function') {
      return messageContent(userName);
    }
    return messageContent;
  };

  const content = getContent();

  return (
    <MessageContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Space direction="vertical">
        <Text strong style={{ fontSize: 16 }}>
          {content.title}
        </Text>
        {content.content && (
          <Text type="secondary">
            {content.content}
          </Text>
        )}
      </Space>
    </MessageContainer>
  );
};

interface ProgressMessageProps {
  current: number;
  total: number;
  stage: string;
}

export const ProgressMessage: React.FC<ProgressMessageProps> = ({
  current,
  total,
  stage
}) => {
  const percentage = Math.round((current / total) * 100);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Text type="secondary">
          {stage} ({percentage}% 完成)
        </Text>
        <motion.div
          style={{
            height: 4,
            background: '#f0f0f0',
            borderRadius: 2,
            overflow: 'hidden'
          }}
        >
          <motion.div
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #108ee9 0%, #87d068 100%)',
              borderRadius: 2
            }}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </motion.div>
      </Space>
    </motion.div>
  );
};

interface FeedbackMessageProps {
  type: 'success' | 'info' | 'warning';
  message: string;
}

export const FeedbackMessage: React.FC<FeedbackMessageProps> = ({
  type,
  message
}) => {
  const colors = {
    success: '#52c41a',
    info: '#1890ff',
    warning: '#faad14'
  };

  const icons = {
    success: '✅',
    info: 'ℹ️',
    warning: '⚠️'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{
        padding: '8px 16px',
        background: `${colors[type]}10`,
        borderRadius: 8,
        border: `1px solid ${colors[type]}30`,
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }}
    >
      <span>{icons[type]}</span>
      <Text style={{ color: colors[type] }}>{message}</Text>
    </motion.div>
  );
};
