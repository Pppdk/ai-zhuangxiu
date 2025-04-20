import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Steps, Card, Radio, Checkbox, Slider, Button } from 'antd';
import { HomeOutlined, TeamOutlined, CalendarOutlined, WalletOutlined } from '@ant-design/icons';
import '../styles/basicInfo.css';

interface BasicInfoPageProps {
  userName: string;
  onComplete: (info: {
    houseType: string;
    familyMembers: string[];
    duration: number;
    budget: number;
  }) => void;
}

export const BasicInfoPage: React.FC<BasicInfoPageProps> = ({ userName, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    houseType: '',
    familyMembers: [] as string[],
    duration: 3,
    budget: 150000
  });

  // 住所类型选项
  const houseTypes = [
    { label: '公寓', value: 'apartment', icon: '🏢' },
    { label: '复式', value: 'duplex', icon: '🏰' },
    { label: '别墅', value: 'villa', icon: '🏡' },
    { label: '其他', value: 'other', icon: '🏠' }
  ];

  // 家庭成员选项
  const familyOptions = [
    { label: '单身', value: 'single', icon: '👤' },
    { label: '双人世界', value: 'couple', icon: '👫' },
    { label: '有小朋友', value: 'children', icon: '👶' },
    { label: '有老人', value: 'elderly', icon: '👴' },
    { label: '有宠物', value: 'pets', icon: '🐱' }
  ];

  // 预算范围标记
  const budgetMarks = {
    50000: '5万',
    150000: '15万',
    300000: '30万',
    500000: '50万+'
  };

  // 装修时长标记
  const durationMarks = {
    1: '1个月',
    3: '3个月',
    6: '6个月',
    12: '12个月+'
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // 检查当前步骤是否可以继续
  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.houseType !== '';
      case 1:
        return formData.familyMembers.length > 0;
      case 2:
        return true; // 时长总是有默认值
      case 3:
        return true; // 预算总是有默认值
      default:
        return false;
    }
  };

  const steps = [
    {
      title: '住所类型',
      icon: <HomeOutlined />,
      content: (
        <div className="step-content">
          <h2>你想装扮的是哪种住所呢？</h2>
          <div className="house-type-grid">
            {houseTypes.map(type => (
              <Card
                key={type.value}
                className={`house-type-card ${formData.houseType === type.value ? 'selected' : ''}`}
                onClick={() => setFormData({ ...formData, houseType: type.value })}
              >
                <div className="house-type-icon">{type.icon}</div>
                <div className="house-type-label">{type.label}</div>
              </Card>
            ))}
          </div>
        </div>
      )
    },
    {
      title: '家庭成员',
      icon: <TeamOutlined />,
      content: (
        <div className="step-content">
          <h2>谁会一起生活在这个家呢？</h2>
          <Checkbox.Group
            className="family-checkbox-group"
            value={formData.familyMembers}
            onChange={values => setFormData({ ...formData, familyMembers: values as string[] })}
          >
            {familyOptions.map(option => (
              <Card key={option.value} className="family-option-card">
                <Checkbox value={option.value}>
                  <span className="family-option-icon">{option.icon}</span>
                  <span className="family-option-label">{option.label}</span>
                </Checkbox>
              </Card>
            ))}
          </Checkbox.Group>
        </div>
      )
    },
    {
      title: '装修时长',
      icon: <CalendarOutlined />,
      content: (
        <div className="step-content">
          <h2>计划装修多长时间？</h2>
          <p className="subtitle">拖动滑块选择预计的装修时长</p>
          <div className="slider-container">
            <Slider
              marks={durationMarks}
              min={1}
              max={12}
              value={formData.duration}
              onChange={value => setFormData({ ...formData, duration: value })}
            />
          </div>
        </div>
      )
    },
    {
      title: '装修预算',
      icon: <WalletOutlined />,
      content: (
        <div className="step-content">
          <h2>心理预算是多少呢？</h2>
          <p className="subtitle">拖动滑块选择你的装修预算范围</p>
          <div className="slider-container">
            <Slider
              marks={budgetMarks}
              min={50000}
              max={500000}
              step={10000}
              value={formData.budget}
              onChange={value => setFormData({ ...formData, budget: value })}
            />
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="basic-info-container">
      <motion.div
        className="basic-info-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>你好，{userName}！让我们开始规划你的理想家居吧！</h1>
        <Steps
          current={currentStep}
          items={steps.map(item => ({
            title: item.title,
            icon: item.icon
          }))}
        />
        
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="step-container"
        >
          {steps[currentStep].content}
        </motion.div>

        <div className="steps-action">
          {currentStep > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={handlePrevious}>
              上一步
            </Button>
          )}
          <Button
            type="primary"
            onClick={handleNext}
            disabled={!canProceed()}
          >
            {currentStep === steps.length - 1 ? '完成' : '下一步'}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
