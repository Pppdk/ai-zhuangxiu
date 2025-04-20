import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Typography,
  Card,
  Button,
  Space,
  Row,
  Col,
  Progress,
  Tag,
  Divider,
  List,
  Avatar,
} from 'antd';
import {
  HomeOutlined,
  CheckCircleOutlined,
  RightOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import styled from '@emotion/styled';

const { Title, Text, Paragraph } = Typography;

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

const BubbleTag = styled(Tag)`
  border-radius: 16px;
  padding: 4px 12px;
  margin: 4px;
  font-size: 14px;
`;

const Results: React.FC = () => {
  const navigate = useNavigate();
  const [analyzing, setAnalyzing] = useState(true);
  const [userName, setUserName] = useState('');
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    // 模拟分析过程
    const name = localStorage.getItem('userName') || '朋友';
    setUserName(name);

    const basicInfo = JSON.parse(localStorage.getItem('basicInfo') || '{}');
    const stylePreferences = JSON.parse(localStorage.getItem('stylePreferences') || '{}');
    const needsAnalysis = JSON.parse(localStorage.getItem('needsAnalysis') || '{}');

    // 生成分析结果
    setTimeout(() => {
      const analysisResults = {
        styleName: '现代简约自然风',
        styleDescription: '追求简约大方的空间布局，融入自然元素，打造温馨舒适的生活氛围。',
        keyPoints: [
          '空间利用最大化',
          '自然采光优化',
          '储物功能强化',
          '材质搭配协调',
        ],
        roomPlans: {
          living: {
            title: '客厅改造方案',
            points: [
              '采用大面积落地窗，提升自然采光',
              '定制多功能电视柜，增加储物空间',
              '选择简约舒适的布艺沙发',
            ],
            budget: 50000,
          },
          kitchen: {
            title: '厨房改造方案',
            points: [
              '岛台设计，增加操作空间',
              '定制吊柜到顶，最大化收纳',
              '选用防油易清洁的台面材质',
            ],
            budget: 40000,
          },
          master: {
            title: '主卧改造方案',
            points: [
              '定制整体衣柜，解决收纳问题',
              '设计梳妆区和书桌区的复合功能',
              '选用静音地板，提升休息质量',
            ],
            budget: 35000,
          },
        },
        totalBudget: 180000,
        timeline: 90,
      };

      setResults(analysisResults);
      setAnalyzing(false);
    }, 3000);
  }, []);

  if (analyzing) {
    return (
      <PageContainer>
        <ContentBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ textAlign: 'center', marginTop: 100 }}>
            <LoadingOutlined style={{ fontSize: 48, marginBottom: 24 }} />
            <Title level={3}>正在为你生成个性化方案...</Title>
            <Text type="secondary">这可能需要一点时间，请稍候</Text>
          </div>
        </ContentBox>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <ContentBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title level={2} style={{ textAlign: 'center', marginBottom: 40 }}>
          {userName}，这是为你定制的装修方案
        </Title>

        <StyledCard>
          <Row gutter={24} align="middle">
            <Col span={16}>
              <Title level={3}>{results.styleName}</Title>
              <Paragraph>{results.styleDescription}</Paragraph>
              <Space wrap>
                {results.keyPoints.map((point: string) => (
                  <BubbleTag key={point} color="blue">
                    <CheckCircleOutlined /> {point}
                  </BubbleTag>
                ))}
              </Space>
            </Col>
            <Col span={8}>
              <div style={{ textAlign: 'center' }}>
                <Progress
                  type="circle"
                  percent={100}
                  format={() => '完成'}
                  status="success"
                />
              </div>
            </Col>
          </Row>
        </StyledCard>

        <Row gutter={24}>
          {Object.entries(results.roomPlans).map(([key, plan]: [string, any]) => (
            <Col span={8} key={key}>
              <StyledCard>
                <Title level={4}>{plan.title}</Title>
                <List
                  size="small"
                  dataSource={plan.points}
                  renderItem={(item: string) => (
                    <List.Item>
                      <Text>{item}</Text>
                    </List.Item>
                  )}
                />
                <Divider />
                <div style={{ textAlign: 'center' }}>
                  <Text type="secondary">预算参考</Text>
                  <br />
                  <Text strong style={{ fontSize: 20 }}>
                    ¥{plan.budget.toLocaleString()}
                  </Text>
                </div>
              </StyledCard>
            </Col>
          ))}
        </Row>

        <StyledCard>
          <Row gutter={48}>
            <Col span={12}>
              <Title level={4}>总体预算</Title>
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <Text style={{ fontSize: 36, color: '#1890ff' }}>
                  ¥{results.totalBudget.toLocaleString()}
                </Text>
              </div>
            </Col>
            <Col span={12}>
              <Title level={4}>预计工期</Title>
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <Text style={{ fontSize: 36, color: '#1890ff' }}>
                  {results.timeline} 天
                </Text>
              </div>
            </Col>
          </Row>
        </StyledCard>

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <Space size="large">
            <Button
              type="primary"
              size="large"
              icon={<HomeOutlined />}
              onClick={() => navigate('/')}
            >
              查看详细方案
            </Button>
          </Space>
        </div>

        <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginTop: 24 }}>
          探索之旅：5/5
        </Text>
      </ContentBox>
    </PageContainer>
  );
};

export default Results;
