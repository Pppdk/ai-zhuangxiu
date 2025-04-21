import React from 'react';
import { Card, Typography, Row, Col, Tag, Image } from 'antd';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

const { Title, Text } = Typography;

const StyleCard = styled(Card)`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 24px;
  
  .ant-card-body {
    padding: 24px;
  }
  
  .style-image {
    width: 100%;
    height: 240px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 16px;
  }
  
  .style-tag {
    margin: 4px;
  }
`;

export interface StylePreset {
  name: string;
  description: string;
  features: string[];
  imageUrl: string;
  fallbackImageUrl: string;
}

export const stylePresets: Record<string, StylePreset> = {
  modern: {
    name: '现代简约',
    description: '这种风格强调简洁和功能性，采用清晰的线条和几何形状，色彩以中性色调为主。适合追求时尚与实用性的家庭。',
    features: ['简约线条', '功能实用', '中性色调', '几何元素'],
    imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0',
    fallbackImageUrl: '/images/styles/modern.jpg',
  },
  natural: {
    name: '自然舒适',
    description: '将自然元素融入室内设计，使用原木、藤编等材质，打造温馨舒适的居住空间。适合注重生活品质的家庭。',
    features: ['原木元素', '自然材质', '柔和光线', '绿植搭配'],
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
    fallbackImageUrl: '/images/styles/natural.jpg',
  },
  nordic: {
    name: '北欧风格',
    description: '以简洁、实用、美观为设计原则，强调自然采光和开放空间，色彩以白色为主，搭配温暖的木质元素。',
    features: ['极简主义', '自然采光', '木质元素', '白色基调'],
    imageUrl: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea',
    fallbackImageUrl: '/images/styles/nordic.jpg',
  },
};

export type StylePresetKey = keyof typeof stylePresets;

interface StyleSuggestionProps {
  style: StylePresetKey;
  className?: string;
}

const StyleSuggestion: React.FC<StyleSuggestionProps> = ({ style, className }) => {
  const styleInfo = stylePresets[style];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <StyleCard>
        <Image
          className="style-image"
          src={styleInfo.imageUrl}
          fallback={styleInfo.fallbackImageUrl}
          alt={styleInfo.name}
          preview={false}
        />
        <Title level={4}>{styleInfo.name}</Title>
        <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
          {styleInfo.description}
        </Text>
        <Row gutter={[8, 8]}>
          {styleInfo.features.map((feature, index) => (
            <Col key={index}>
              <Tag color="blue" className="style-tag">
                {feature}
              </Tag>
            </Col>
          ))}
        </Row>
      </StyleCard>
    </motion.div>
  );
};

export default StyleSuggestion;
