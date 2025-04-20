import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Typography, Card, Space, Button, Slider, Tag } from 'antd';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
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
  max-width: 800px;
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

const HouseTypeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  margin: 24px 0;
`;

const HouseTypeCard = styled(motion.div)<{ selected?: boolean }>`
  padding: 24px;
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
  background: ${props => props.selected ? '#e6f7ff' : '#fff'};
  border: 2px solid ${props => props.selected ? '#1890ff' : '#f0f0f0'};
  transition: all 0.3s ease;

  &:hover {
    border-color: #1890ff;
  }
`;

const FamilyMemberTags = styled.div`
  margin: 24px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 48px;
`;

const BasicInfo: React.FC = () => {
  const navigate = useNavigate();
  const [houseType, setHouseType] = useState('');
  const [purpose, setPurpose] = useState('');
  const [familyMembers, setFamilyMembers] = useState<string[]>([]);
  const [duration, setDuration] = useState(3);
  const [budget, setBudget] = useState(10);

  const houseTypes = [
    { key: 'apartment', label: '公寓', icon: '🏢' },
    { key: 'duplex', label: '复式', icon: '🏰' },
    { key: 'villa', label: '别墅', icon: '🏡' },
    { key: 'other', label: '其他', icon: '🏠' },
  ];

  const purposes = [
    { key: 'home', label: '长期自住的港湾' },
    { key: 'temporary', label: '短期过渡的驿站' },
    { key: 'investment', label: '出租增值的资产' },
  ];

  const memberOptions = [
    { key: 'single', label: '单身' },
    { key: 'couple', label: '二人世界' },
    { key: 'child', label: '有小朋友' },
    { key: 'elderly', label: '有老人' },
    { key: 'pet', label: '有宠物' },
  ];

  const toggleMember = (member: string) => {
    if (familyMembers.includes(member)) {
      setFamilyMembers(familyMembers.filter(m => m !== member));
    } else {
      setFamilyMembers([...familyMembers, member]);
    }
  };

  const handleNext = () => {
    // 保存数据
    const basicInfo = {
      houseType,
      purpose,
      familyMembers,
      duration,
      budget
    };
    localStorage.setItem('basicInfo', JSON.stringify(basicInfo));
    navigate('/onboarding/style-explorer');
  };

  return (
    <PageContainer>
      <ContentBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title level={2} style={{ textAlign: 'center', marginBottom: 40 }}>
          让我们了解一下你的基本需求
        </Title>

        <StyledCard>
          <Title level={4}>你想装扮的是哪种住所呢？</Title>
          <HouseTypeGrid>
            {houseTypes.map(type => (
              <HouseTypeCard
                key={type.key}
                selected={houseType === type.key}
                onClick={() => setHouseType(type.key)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div style={{ fontSize: 32 }}>{type.icon}</div>
                <Text>{type.label}</Text>
              </HouseTypeCard>
            ))}
          </HouseTypeGrid>
        </StyledCard>

        <StyledCard>
          <Title level={4}>这个家对你来说意味着什么？</Title>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            {purposes.map(p => (
              <Button
                key={p.key}
                type={purpose === p.key ? 'primary' : 'default'}
                onClick={() => setPurpose(p.key)}
                style={{ height: 'auto', padding: '12px', width: '100%', textAlign: 'left' }}
              >
                {p.label}
              </Button>
            ))}
          </Space>
        </StyledCard>

        <StyledCard>
          <Title level={4}>有哪些家庭成员会一起生活？</Title>
          <FamilyMemberTags>
            {memberOptions.map(member => (
              <Tag
                key={member.key}
                color={familyMembers.includes(member.key) ? 'blue' : 'default'}
                onClick={() => toggleMember(member.key)}
                style={{ padding: '8px 16px', fontSize: 14, cursor: 'pointer' }}
              >
                {member.label}
              </Tag>
            ))}
          </FamilyMemberTags>
        </StyledCard>

        <StyledCard>
          <Title level={4}>装修大概计划多久完成？</Title>
          <Slider
            min={1}
            max={12}
            value={duration}
            onChange={setDuration}
            marks={{
              1: '1个月',
              3: '3个月',
              6: '半年',
              12: '1年'
            }}
          />
        </StyledCard>

        <StyledCard>
          <Title level={4}>心理预算大致在哪个范围？</Title>
          <Slider
            min={5}
            max={50}
            value={budget}
            onChange={setBudget}
            marks={{
              5: '5万',
              10: '10万',
              20: '20万',
              50: '50万+'
            }}
          />
        </StyledCard>

        <NavigationButtons>
          <Button
            size="large"
            icon={<LeftOutlined />}
            onClick={() => navigate('/onboarding')}
          >
            返回
          </Button>
          <Button
            type="primary"
            size="large"
            icon={<RightOutlined />}
            onClick={handleNext}
            disabled={!houseType || !purpose || familyMembers.length === 0}
          >
            下一步
          </Button>
        </NavigationButtons>

        <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginTop: 24 }}>
          探索之旅：2/5
        </Text>
      </ContentBox>
    </PageContainer>
  );
};

export default BasicInfo;
