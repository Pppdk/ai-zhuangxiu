import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Typography,
  Card,
  Space,
  Button,
  Row,
  Col,
  Progress,
  Divider,
  Tag,
  Spin,
  Result,
  Statistic,
  Radio,
  Tooltip,
  Modal,
  Form,
  Checkbox,
  Rate,
} from 'antd';
import type { RadioChangeEvent } from 'antd';
import {
  HomeOutlined,
  ArrowRightOutlined,
  LeftOutlined,
  AreaChartOutlined,
  TeamOutlined,
  HeartOutlined,
  HeartFilled,
  QuestionCircleOutlined,
  EditOutlined,
} from '@ant-design/icons';
import styled from '@emotion/styled';
import { recommendationEngine, StyleScore } from '../../utils/recommendationEngine';
import PageTransition from '../../components/PageTransition';
import { SelectableCard, CelebrationEffect, staggerContainerVariants, staggerItemVariants } from '../../components/AnimatedElements';
import { EmotionalMessage, FeedbackMessage } from '../../components/EmotionalContent';
import StyleSuggestion, { stylePresets } from '../../components/StyleSuggestion';
import SpaceRecommendation from '../../components/SpaceRecommendation';

interface UserData {
  name: string;
  houseType: string;
  size: number;
  familySize: number;
  budget: number;
  timeline: string;
  lifestyle: string[];
  priorities: string[];
}

const { Title, Text, Paragraph } = Typography;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const ContentWrapper = styled(motion.div)`
  background: #fff;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const SummaryIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: #f0f5ff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
`;

const InfoCard = styled(SelectableCard)`
  .ant-statistic {
    text-align: center;
    
    .ant-statistic-title {
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
      margin-bottom: 8px;
    }
    
    .ant-statistic-content {
      font-size: 24px;
      
      .ant-statistic-content-prefix {
        margin-right: 8px;
        color: #1890ff;
      }
      
      .ant-statistic-content-suffix {
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
      }
    }
  }
`;

const BudgetCard = styled(Card)`
  .ant-progress-text {
    font-size: 14px;
    font-weight: 500;
  }
`;

const TimelineCard = styled(Card)`
  .ant-timeline-item-content {
    margin-left: 32px;
  }
  .ant-timeline-item-head {
    width: 16px;
    height: 16px;
    border: 2px solid #1890ff;
    background: #fff;
  }
`;

const InteractionCard = styled(Card)`
  margin-top: 16px;
  border-radius: 8px;
  
  .ant-radio-group {
    width: 100%;
  }
  
  .ant-radio-button-wrapper {
    text-align: center;
    height: 40px;
    line-height: 38px;
  }
`;

const budgetBreakdown = {
  materials: {
    name: '主材（地板、瓷砖等）',
    percent: 40,
    details: [
      '地板：15%',
      '瓷砖：12%',
      '橱柜：8%',
      '洁具：5%',
    ],
  },
  labor: {
    name: '人工（施工、安装）',
    percent: 25,
    details: [
      '水电工：8%',
      '泥工：7%',
      '木工：6%',
      '油漆工：4%',
    ],
  },
  auxiliary: {
    name: '辅材（油漆、胶水等）',
    percent: 20,
    details: [
      '油漆材料：7%',
      '五金配件：5%',
      '水电材料：5%',
      '其他辅材：3%',
    ],
  },
  design: {
    name: '设计费',
    percent: 10,
    details: [
      '方案设计：6%',
      '施工图纸：4%',
    ],
  },
  others: {
    name: '其他（保险、搬运等）',
    percent: 5,
    details: [
      '保险费：2%',
      '搬运费：2%',
      '垃圾清运：1%',
    ],
  },
};

const Results: React.FC = () => {
  const [showCelebration, setShowCelebration] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [selectedSpace, setSelectedSpace] = useState('living');
  const [styleScores, setStyleScores] = useState<StyleScore[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<keyof typeof stylePresets>('modern');
  const [showStyleDetails, setShowStyleDetails] = useState(false);
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      // 获取用户数据
      const name = localStorage.getItem('userName') || '用户';
      const houseType = localStorage.getItem('houseType') || '';
      const size = Number(localStorage.getItem('size')) || 0;
      const familySize = Number(localStorage.getItem('familySize')) || 0;
      const budget = Number(localStorage.getItem('budget')) || 0;
      const timeline = localStorage.getItem('timeline') || '';
      const lifestyle = JSON.parse(localStorage.getItem('lifestyle') || '[]');
      const priorities = JSON.parse(localStorage.getItem('priorities') || '[]');

      const data: UserData = {
        name,
        houseType,
        size,
        familySize,
        budget,
        timeline,
        lifestyle,
        priorities
      };

      setUserData(data);
      
      // 计算风格推荐得分
      const scores = recommendationEngine.calculateStyleScores(data);
      setStyleScores(scores);
      setSelectedStyle(scores[0].styleName);
      
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 2000);
    } catch (error) {
      console.error('解析用户数据时出错:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleStyleChange = (e: RadioChangeEvent) => {
    setSelectedStyle(e.target.value as keyof typeof stylePresets);
  };

  const handleUpdatePreferences = (values: { lifestyle: string[]; priorities: string[] }) => {
    if (!userData) return;

    const updatedData: UserData = {
      ...userData,
      lifestyle: values.lifestyle || [],
      priorities: values.priorities || []
    };
    
    setUserData(updatedData);
    localStorage.setItem('lifestyle', JSON.stringify(values.lifestyle));
    localStorage.setItem('priorities', JSON.stringify(values.priorities));
    
    // 重新计算推荐
    const scores = recommendationEngine.calculateStyleScores(updatedData);
    setStyleScores(scores);
    setShowPreferencesModal(false);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleStart = () => {
    navigate('/dashboard');
  };

  const renderStyleSelection = () => (
    <motion.div variants={staggerItemVariants}>
      <Title level={4} style={{ marginBottom: 24 }}>
        推荐装修风格
        <Tooltip title="点击查看推荐原因">
          <QuestionCircleOutlined
            style={{ marginLeft: 8, cursor: 'pointer' }}
            onClick={() => setShowStyleDetails(true)}
          />
        </Tooltip>
      </Title>
      
      <InteractionCard>
        <Radio.Group
          value={selectedStyle}
          onChange={handleStyleChange}
          buttonStyle="solid"
          style={{ marginBottom: 16 }}
        >
          <Row gutter={[16, 16]}>
            {styleScores.map((style) => (
              <Col span={8} key={style.styleName}>
                <Radio.Button value={style.styleName} style={{ width: '100%' }}>
                  {stylePresets[style.styleName].name}
                  <Progress
                    percent={style.score}
                    size="small"
                    showInfo={false}
                    strokeColor={{
                      '0%': '#108ee9',
                      '100%': '#87d068',
                    }}
                    style={{ marginTop: 4 }}
                  />
                </Radio.Button>
              </Col>
            ))}
          </Row>
        </Radio.Group>
        
        <Button
          type="link"
          icon={<EditOutlined />}
          onClick={() => setShowPreferencesModal(true)}
        >
          调整偏好设置
        </Button>
      </InteractionCard>
      
      <StyleSuggestion style={selectedStyle} />
    </motion.div>
  );

  if (loading) {
    return (
      <Container>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <Spin size="large" />
        </div>
      </Container>
    );
  }

  if (!userData) {
    return (
      <Container>
        <Result
          status="error"
          title="数据加载失败"
          subTitle="无法获取您的装修偏好数据，请重新开始"
          extra={[
            <Button key="back" onClick={handleBack}>
              返回
            </Button>
          ]}
        />
      </Container>
    );
  }

  return (
    <PageTransition>
      <Container>
        <AnimatePresence>
          {showCelebration && <CelebrationEffect />}
        </AnimatePresence>
        
        <ContentWrapper
          variants={staggerContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={staggerItemVariants}>
            <EmotionalMessage
              type="completion"
              userName={userData?.name}
            />
          </motion.div>

          <Row gutter={[24, 24]}>
            <Col span={24}>
              <motion.div variants={staggerItemVariants}>
                <InfoCard>
                  <Row align="middle" style={{ marginBottom: 24 }}>
                    <Col>
                      <SummaryIcon>
                        <HomeOutlined style={{ color: '#1890ff' }} />
                      </SummaryIcon>
                    </Col>
                    <Col flex="auto">
                      <Title level={4} style={{ margin: 0 }}>专属{userData?.name}的装修方案</Title>
                      <Text type="secondary">我们根据你的喜好和需求，精心定制了以下建议</Text>
                    </Col>
                  </Row>
                  
                  <Row gutter={[32, 16]} justify="space-around">
                    <Col xs={24} sm={8}>
                      <Statistic
                        title="房屋类型"
                        value={userData?.houseType}
                        prefix={<HomeOutlined />}
                      />
                    </Col>
                    <Col xs={24} sm={8}>
                      <Statistic
                        title="建筑面积"
                        value={userData?.size}
                        suffix="m²"
                        prefix={<AreaChartOutlined />}
                      />
                    </Col>
                    <Col xs={24} sm={8}>
                      <Statistic
                        title="家庭成员"
                        value={userData?.familySize}
                        suffix="人"
                        prefix={<TeamOutlined />}
                      />
                    </Col>
                  </Row>
                </InfoCard>
              </motion.div>

              {renderStyleSelection()}
              
              <motion.div variants={staggerItemVariants}>
                <Title level={4} style={{ marginBottom: 24 }}>空间改造建议</Title>
                <SpaceRecommendation
                  selectedSpace={selectedSpace}
                  onSpaceChange={setSelectedSpace}
                />
              </motion.div>

              <motion.div variants={staggerItemVariants}>
                <BudgetCard>
                  <Title level={4}>预算分配建议</Title>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    {Object.values(budgetBreakdown).map((item, index) => (
                      <div key={index}>
                        <Row align="middle" justify="space-between" style={{ marginBottom: 8 }}>
                          <Col>
                            <Text strong>{item.name}</Text>
                          </Col>
                          <Col>
                            <Text type="secondary">
                              {((item.percent / 100) * userData.budget).toFixed(1)}万元
                            </Text>
                          </Col>
                        </Row>
                        <Progress 
                          percent={item.percent} 
                          strokeColor={{
                            '0%': '#108ee9',
                            '100%': '#87d068',
                          }}
                          strokeWidth={8}
                          showInfo={false}
                        />
                        <div style={{ marginLeft: 24, marginBottom: 16 }}>
                          {item.details.map((detail, idx) => {
                            const percentage = parseFloat(detail.match(/\d+/)?.[0] || '0');
                            const amount = ((percentage / 100) * userData.budget).toFixed(1);
                            return (
                              <Row key={idx} justify="space-between" style={{ marginTop: 8 }}>
                                <Col>
                                  <Text type="secondary" style={{ fontSize: 12 }}>
                                    {detail.split('：')[0]}
                                  </Text>
                                </Col>
                                <Col>
                                  <Text type="secondary" style={{ fontSize: 12 }}>
                                    {amount}万元
                                  </Text>
                                </Col>
                              </Row>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </Space>
                  <Divider />
                  <Row justify="space-between" align="middle">
                    <Col>
                      <Text>预算总计</Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        建议预留{(userData.budget * 0.1).toFixed(1)}万元作为机动资金
                      </Text>
                    </Col>
                    <Col>
                      <Text strong style={{ fontSize: 24, color: '#1890ff' }}>
                        {userData.budget}万元
                      </Text>
                    </Col>
                  </Row>
                </BudgetCard>
              </motion.div>

              <motion.div
                variants={staggerItemVariants}
                style={{ textAlign: 'center', marginTop: 40 }}
              >
                <FeedbackMessage
                  type="success"
                  message="恭喜！你的装修规划已经完成，接下来就让我们开始实现它吧！"
                />
                <Space size="large" style={{ marginTop: 24 }}>
                  <Button
                    icon={<LeftOutlined />}
                    onClick={handleBack}
                    className="ripple-button"
                  >
                    返回修改
                  </Button>
                  <Button
                    type="primary"
                    icon={<ArrowRightOutlined />}
                    onClick={handleStart}
                    className="ripple-button"
                  >
                    开始装修之旅
                  </Button>
                </Space>
              </motion.div>

              <motion.div
                variants={staggerItemVariants}
                style={{ textAlign: 'center', marginTop: 24 }}
              >
                <Text type="secondary">🎉 完美！你已完成所有探索环节</Text>
              </motion.div>
            </Col>
          </Row>
        </ContentWrapper>

        <Modal
          title="风格推荐详情"
          open={showStyleDetails}
          onCancel={() => setShowStyleDetails(false)}
          footer={null}
        >
          {styleScores.map((style) => (
            <div key={style.styleName} style={{ marginBottom: 16 }}>
              <Title level={5}>
                {stylePresets[style.styleName].name}
                <span style={{ marginLeft: 8, fontSize: 14, color: '#1890ff' }}>
                  匹配度 {style.score}%
                </span>
              </Title>
              <ul>
                {style.reasons.map((reason: string, index: number) => (
                  <li key={index}>{reason}</li>
                ))}
              </ul>
              <Divider />
            </div>
          ))}
        </Modal>

        <Modal
          title="调整偏好设置"
          open={showPreferencesModal}
          onOk={() => form.submit()}
          onCancel={() => setShowPreferencesModal(false)}
        >
          <Form
            form={form}
            onFinish={handleUpdatePreferences}
            initialValues={{
              lifestyle: userData?.lifestyle || [],
              priorities: userData?.priorities || []
            }}
          >
            <Form.Item
              label="生活方式"
              name="lifestyle"
            >
              <Checkbox.Group>
                <Row gutter={[16, 8]}>
                  <Col span={12}>
                    <Checkbox value="active">活力充沛</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value="relaxed">休闲放松</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value="social">社交娱乐</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value="private">私密安静</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>

            <Form.Item
              label="装修重点"
              name="priorities"
            >
              <Checkbox.Group>
                <Row gutter={[16, 8]}>
                  <Col span={12}>
                    <Checkbox value="comfort">舒适度</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value="storage">收纳空间</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value="lighting">采光通风</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value="eco">环保节能</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>
          </Form>
        </Modal>
      </Container>
    </PageTransition>
  );
};

export default Results;
