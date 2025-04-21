import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Typography, Card, Button, Space, Row, Col, Tag } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import PageTransition from '../../components/PageTransition';

const { Title, Text } = Typography;

const PageContainer = styled(motion.div)`
  min-height: 100vh;
  background: linear-gradient(135deg, #fff5f5 0%, #fff 100%);
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentBox = styled(motion.div)`
  max-width: 1000px;
  width: 100%;
  margin: 40px auto;
`;

const StyledCard = styled(Card)`
  margin-bottom: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  .ant-card-body {
    padding: 24px;
  }
`;

const RoomCard = styled(motion.div)<{ selected?: boolean }>`
  padding: 24px;
  border-radius: 12px;
  cursor: pointer;
  background: ${props => props.selected ? '#e6f7ff' : '#fff'};
  border: 2px solid ${props => props.selected ? '#1890ff' : '#f0f0f0'};
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: #1890ff;
  }
`;

const PainPointCard = styled(Card)<{ selected?: boolean }>`
  margin-bottom: 16px;
  border: 2px solid ${props => props.selected ? '#1890ff' : '#f0f0f0'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #1890ff;
  }
`;

const NeedsAnalysis: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRooms, setSelectedRooms] = useState<{[key: string]: string[]}>({});
  const [painPoints, setPainPoints] = useState<string[]>([]);

  const rooms = [
    { key: 'entrance', label: '玄关入口', icon: '🚪' },
    { key: 'living', label: '客厅', icon: '🛋' },
    { key: 'kitchen', label: '厨房', icon: '🍳' },
    { key: 'master', label: '主卧', icon: '🛏' },
    { key: 'bathroom', label: '卫生间', icon: '🚿' },
    { key: 'balcony', label: '阳台', icon: '🌿' },
  ];

  const roomFeatures = {
    entrance: ['收纳空间', '换鞋区', '装饰展示'],
    living: ['采光通风', '电视墙', '沙发区', '储物空间'],
    kitchen: ['操作台面', '收纳空间', '电器区', '就餐区'],
    master: ['衣柜收纳', '梳妆区', '休息区', '书桌区'],
    bathroom: ['干湿分离', '收纳空间', '通风系统'],
    balcony: ['晾晒区', '休闲区', '种植区'],
  };

  const painPointsList = [
    { key: 'storage', label: '储物空间不足', icon: '📦' },
    { key: 'light', label: '采光不足', icon: '💡' },
    { key: 'space', label: '空间局促', icon: '📏' },
    { key: 'ventilation', label: '通风不好', icon: '💨' },
    { key: 'noise', label: '隔音效果差', icon: '🔊' },
    { key: 'moisture', label: '防潮问题', icon: '💧' },
  ];

  const toggleRoomFeature = (room: string, feature: string) => {
    setSelectedRooms(prev => {
      const roomFeatures = prev[room] || [];
      return {
        ...prev,
        [room]: roomFeatures.includes(feature)
          ? roomFeatures.filter(f => f !== feature)
          : [...roomFeatures, feature],
      };
    });
  };

  const togglePainPoint = (key: string) => {
    setPainPoints(prev =>
      prev.includes(key)
        ? prev.filter(k => k !== key)
        : [...prev, key]
    );
  };

  const handleNext = () => {
    // 保存数据
    const needsAnalysis = {
      roomFeatures: selectedRooms,
      painPoints,
    };
    localStorage.setItem('needsAnalysis', JSON.stringify(needsAnalysis));
    navigate('/onboarding/results');
  };

  return (
    <PageTransition>
      <PageContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <ContentBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Title level={2} style={{ textAlign: 'center', marginBottom: 40 }}>
            让我们了解你的具体需求
          </Title>

          <StyledCard>
            <Title level={4}>每个空间的重点需求（可多选）</Title>
            <Row gutter={[16, 16]}>
              {rooms.map(room => (
                <Col span={8} key={room.key}>
                  <StyledCard>
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <div style={{ textAlign: 'center', marginBottom: 16 }}>
                        <Text style={{ fontSize: 24 }}>{room.icon}</Text>
                        <Title level={5} style={{ margin: '8px 0' }}>{room.label}</Title>
                      </div>
                      <Space wrap>
                        {roomFeatures[room.key as keyof typeof roomFeatures].map(feature => (
                          <Tag
                            key={feature}
                            color={selectedRooms[room.key]?.includes(feature) ? 'blue' : 'default'}
                            onClick={() => toggleRoomFeature(room.key, feature)}
                            style={{ cursor: 'pointer', padding: '4px 8px', margin: '4px' }}
                          >
                            {feature}
                          </Tag>
                        ))}
                      </Space>
                    </Space>
                  </StyledCard>
                </Col>
              ))}
            </Row>
          </StyledCard>

          <StyledCard>
            <Title level={4}>你目前遇到的困扰（可多选）</Title>
            <Row gutter={[16, 16]}>
              {painPointsList.map(point => (
                <Col span={8} key={point.key}>
                  <PainPointCard
                    selected={painPoints.includes(point.key)}
                    onClick={() => togglePainPoint(point.key)}
                  >
                    <Space align="center">
                      <Text style={{ fontSize: 24 }}>{point.icon}</Text>
                      <Text>{point.label}</Text>
                    </Space>
                  </PainPointCard>
                </Col>
              ))}
            </Row>
          </StyledCard>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 48 }}>
            <Button
              size="large"
              icon={<LeftOutlined />}
              onClick={() => navigate('/onboarding/style-explorer')}
            >
              返回
            </Button>
            <Button
              type="primary"
              size="large"
              icon={<RightOutlined />}
              onClick={handleNext}
              disabled={Object.keys(selectedRooms).length === 0}
            >
              查看结果
            </Button>
          </div>

          <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginTop: 24 }}>
            探索之旅：4/5
          </Text>
        </ContentBox>
      </PageContainer>
    </PageTransition>
  );
};

export default NeedsAnalysis;
