import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Typography, Card, Button, Space, Row, Col } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

const { Title, Text } = Typography;

const PageContainer = styled.div`
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

const MaterialCard = styled(motion.div)<{ selected?: boolean }>`
  padding: 20px;
  border-radius: 12px;
  cursor: pointer;
  background: ${props => props.selected ? '#e6f7ff' : '#fff'};
  border: 2px solid ${props => props.selected ? '#1890ff' : '#f0f0f0'};
  height: 200px;
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

const ColorPalette = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin: 24px 0;
`;

const ColorSwatch = styled.div<{ color: string; selected?: boolean }>`
  width: 80px;
  height: 80px;
  border-radius: 12px;
  background-color: ${props => props.color};
  cursor: pointer;
  border: 3px solid ${props => props.selected ? '#1890ff' : 'transparent'};
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const SceneCard = styled(Card)<{ selected?: boolean }>`
  margin-bottom: 16px;
  border: 2px solid ${props => props.selected ? '#1890ff' : '#f0f0f0'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #1890ff;
  }
`;

const StyleExplorer: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedScenes, setSelectedScenes] = useState<string[]>([]);

  const materials = [
    { key: 'wood', label: '原木', icon: '🪵', description: '温暖自然的触感' },
    { key: 'fabric', label: '布艺', icon: '🧶', description: '柔软舒适的质地' },
    { key: 'metal', label: '金属', icon: '⚙️', description: '现代简约的质感' },
    { key: 'stone', label: '石材', icon: '🗿', description: '稳重大气的质地' },
  ];

  const colors = [
    { key: 'warm', color: '#FFE4E1', label: '温暖米色' },
    { key: 'natural', color: '#F5F5DC', label: '自然白' },
    { key: 'gray', color: '#E6E6FA', label: '优雅灰' },
    { key: 'blue', color: '#E0FFFF', label: '清新蓝' },
    { key: 'green', color: '#F0FFF0', label: '自然绿' },
  ];

  const scenes = [
    {
      key: 'morning',
      title: '周末早晨',
      options: [
        { key: 'bright', label: '在明亮客厅享用早餐' },
        { key: 'cozy', label: '在舒适卧室多睡一会' },
      ],
    },
    {
      key: 'friends',
      title: '朋友来访',
      options: [
        { key: 'warm', label: '温馨的招待氛围' },
        { key: 'style', label: '独特的设计品味' },
        { key: 'clean', label: '整洁的居家环境' },
      ],
    },
    {
      key: 'kitchen',
      title: '厨房对你而言',
      options: [
        { key: 'basic', label: '简单解决温饱的地方' },
        { key: 'hobby', label: '享受烹饪乐趣的天地' },
        { key: 'social', label: '社交聚会的中心' },
      ],
    },
  ];

  const toggleMaterial = (key: string) => {
    setSelectedMaterials(prev =>
      prev.includes(key)
        ? prev.filter(k => k !== key)
        : [...prev, key]
    );
  };

  const toggleColor = (key: string) => {
    setSelectedColors(prev =>
      prev.includes(key)
        ? prev.filter(k => k !== key)
        : [...prev, key]
    );
  };

  const toggleScene = (sceneKey: string, optionKey: string) => {
    setSelectedScenes(prev => {
      const newScenes = prev.filter(k => !k.startsWith(sceneKey + '-'));
      return [...newScenes, `${sceneKey}-${optionKey}`];
    });
  };

  const handleNext = () => {
    // 保存数据
    const stylePreferences = {
      materials: selectedMaterials,
      colors: selectedColors,
      scenes: selectedScenes,
    };
    localStorage.setItem('stylePreferences', JSON.stringify(stylePreferences));
    navigate('/onboarding/needs-analysis');
  };

  return (
    <PageContainer>
      <ContentBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title level={2} style={{ textAlign: 'center', marginBottom: 40 }}>
          探索你的风格偏好
        </Title>

        <StyledCard>
          <Title level={4}>选择你喜欢的材质（可多选）</Title>
          <Row gutter={[16, 16]}>
            {materials.map(material => (
              <Col span={6} key={material.key}>
                <MaterialCard
                  selected={selectedMaterials.includes(material.key)}
                  onClick={() => toggleMaterial(material.key)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div style={{ fontSize: 40, marginBottom: 12 }}>{material.icon}</div>
                  <Text strong>{material.label}</Text>
                  <Text type="secondary">{material.description}</Text>
                </MaterialCard>
              </Col>
            ))}
          </Row>
        </StyledCard>

        <StyledCard>
          <Title level={4}>选择你喜欢的色彩（可多选）</Title>
          <ColorPalette>
            {colors.map(color => (
              <div key={color.key} style={{ textAlign: 'center' }}>
                <ColorSwatch
                  color={color.color}
                  selected={selectedColors.includes(color.key)}
                  onClick={() => toggleColor(color.key)}
                />
                <Text>{color.label}</Text>
              </div>
            ))}
          </ColorPalette>
        </StyledCard>

        <StyledCard>
          <Title level={4}>生活场景偏好</Title>
          <Space direction="vertical" style={{ width: '100%' }}>
            {scenes.map(scene => (
              <div key={scene.key}>
                <Text strong style={{ marginBottom: 8, display: 'block' }}>
                  {scene.title}
                </Text>
                <Space direction="vertical" style={{ width: '100%' }}>
                  {scene.options.map(option => (
                    <SceneCard
                      key={option.key}
                      selected={selectedScenes.includes(`${scene.key}-${option.key}`)}
                      onClick={() => toggleScene(scene.key, option.key)}
                    >
                      <Text>{option.label}</Text>
                    </SceneCard>
                  ))}
                </Space>
              </div>
            ))}
          </Space>
        </StyledCard>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 48 }}>
          <Button
            size="large"
            icon={<LeftOutlined />}
            onClick={() => navigate('/onboarding/basic-info')}
          >
            返回
          </Button>
          <Button
            type="primary"
            size="large"
            icon={<RightOutlined />}
            onClick={handleNext}
            disabled={
              selectedMaterials.length === 0 ||
              selectedColors.length === 0 ||
              selectedScenes.length < 3
            }
          >
            下一步
          </Button>
        </div>

        <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginTop: 24 }}>
          探索之旅：3/5
        </Text>
      </ContentBox>
    </PageContainer>
  );
};

export default StyleExplorer;
