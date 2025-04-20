import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, Rate, Input, Button, Progress } from 'antd';
import {
  HeartOutlined,
  HomeOutlined,
  BulbOutlined,
  EditOutlined,
} from '@ant-design/icons';
import '../styles/needsExploration.css';

interface NeedsExplorationPageProps {
  userName: string;
  onComplete: (data: {
    painPoints: string[];
    roomPreferences: Record<string, number>;
    customNeeds: string;
    selectedStyles: string[];
  }) => void;
}

export const NeedsExplorationPage: React.FC<NeedsExplorationPageProps> = ({
  userName,
  onComplete,
}) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [needsData, setNeedsData] = useState({
    painPoints: [] as string[],
    roomPreferences: {} as Record<string, number>,
    customNeeds: '',
    selectedStyles: [] as string[],
  });

  // 常见痛点列表
  const painPoints = [
    { id: 'storage', label: '收纳空间不足', icon: '📦' },
    { id: 'light', label: '采光不好', icon: '☀️' },
    { id: 'noise', label: '隔音效果差', icon: '🔊' },
    { id: 'space', label: '空间局促', icon: '📏' },
    { id: 'ventilation', label: '通风不畅', icon: '💨' },
    { id: 'layout', label: '布局不合理', icon: '🏠' },
  ];

  // 房间类型列表
  const roomTypes = [
    { id: 'livingRoom', label: '客厅', icon: '🛋️' },
    { id: 'bedroom', label: '卧室', icon: '🛏️' },
    { id: 'kitchen', label: '厨房', icon: '🍳' },
    { id: 'bathroom', label: '卫生间', icon: '🚿' },
    { id: 'balcony', label: '阳台', icon: '🌺' },
  ];

  // 装修风格列表
  const designStyles = [
    {
      id: 'modern',
      label: '现代简约',
      description: '干净利落的线条，简单而不失品味',
      icon: '🎯',
    },
    {
      id: 'nordic',
      label: '北欧风格',
      description: '自然、温馨、实用的完美结合',
      icon: '❄️',
    },
    {
      id: 'japanese',
      label: '日式和风',
      description: '极简主义与传统美学的融合',
      icon: '🎋',
    },
    {
      id: 'industrial',
      label: '工业风',
      description: '粗犷与精致的独特平衡',
      icon: '⚙️',
    },
  ];

  const handlePainPointToggle = (pointId: string) => {
    setNeedsData((prev) => ({
      ...prev,
      painPoints: prev.painPoints.includes(pointId)
        ? prev.painPoints.filter((id) => id !== pointId)
        : [...prev.painPoints, pointId],
    }));
  };

  const handleRoomPreferenceChange = (roomId: string, value: number) => {
    setNeedsData((prev) => ({
      ...prev,
      roomPreferences: {
        ...prev.roomPreferences,
        [roomId]: value,
      },
    }));
  };

  const handleStyleToggle = (styleId: string) => {
    setNeedsData((prev) => ({
      ...prev,
      selectedStyles: prev.selectedStyles.includes(styleId)
        ? prev.selectedStyles.filter((id) => id !== styleId)
        : [...prev.selectedStyles, styleId],
    }));
  };

  const sections = [
    {
      title: '你目前的困扰是什么？',
      icon: <HeartOutlined />,
      content: (
        <div className="section-container">
          <h2>选择你想要改善的地方</h2>
          <p className="section-description">可以多选哦！</p>
          <div className="pain-points-grid">
            {painPoints.map((point) => (
              <Card
                key={point.id}
                className={`pain-point-card ${
                  needsData.painPoints.includes(point.id) ? 'selected' : ''
                }`}
                onClick={() => handlePainPointToggle(point.id)}
              >
                <div className="pain-point-icon">{point.icon}</div>
                <div className="pain-point-text">{point.label}</div>
              </Card>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: '哪些房间最重要？',
      icon: <HomeOutlined />,
      content: (
        <div className="section-container">
          <h2>为每个房间评分</h2>
          <p className="section-description">星级越高表示越重要</p>
          <div className="room-preferences-list">
            {roomTypes.map((room) => (
              <div key={room.id} className="room-preference-item">
                <span className="room-icon">{room.icon}</span>
                <span className="room-name">{room.label}</span>
                <Rate
                  value={needsData.roomPreferences[room.id] || 0}
                  onChange={(value) => handleRoomPreferenceChange(room.id, value)}
                />
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: '喜欢什么风格？',
      icon: <BulbOutlined />,
      content: (
        <div className="section-container">
          <h2>选择你喜欢的装修风格</h2>
          <p className="section-description">可以多选哦！</p>
          <div className="style-grid">
            {designStyles.map((style) => (
              <Card
                key={style.id}
                className={`style-card ${
                  needsData.selectedStyles.includes(style.id) ? 'selected' : ''
                }`}
                onClick={() => handleStyleToggle(style.id)}
              >
                <div className="style-icon">{style.icon}</div>
                <h3>{style.label}</h3>
                <p>{style.description}</p>
              </Card>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: '还有什么想说的？',
      icon: <EditOutlined />,
      content: (
        <div className="section-container">
          <h2>补充你的具体需求</h2>
          <p className="section-description">告诉我们你的其他想法</p>
          <div className="custom-needs-section">
            <Input.TextArea
              className="custom-needs-input"
              rows={4}
              placeholder="例如：我希望有一个舒适的阅读角落..."
              value={needsData.customNeeds}
              onChange={(e) =>
                setNeedsData({ ...needsData, customNeeds: e.target.value })
              }
            />
          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      onComplete(needsData);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const progress = ((currentSection + 1) / sections.length) * 100;

  return (
    <div className="needs-exploration-container">
      <motion.div
        className="needs-exploration-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Progress percent={progress} showInfo={false} />
        <div className="progress-indicator">
          {sections.map((_, index) => (
            <div
              key={index}
              className={`progress-dot ${index === currentSection ? 'active' : ''}`}
            />
          ))}
        </div>

        <motion.div
          key={currentSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
        >
          {sections[currentSection].content}
        </motion.div>

        <div className="navigation-buttons">
          {currentSection > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={handlePrevious}>
              上一步
            </Button>
          )}
          <Button type="primary" onClick={handleNext}>
            {currentSection === sections.length - 1 ? '完成' : '下一步'}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
