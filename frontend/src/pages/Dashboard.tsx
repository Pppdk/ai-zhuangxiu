import React, { useEffect, useState } from 'react';
import { Typography, Row, Col, Card, Button, List } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { needsApi, designApi } from '../services/api';
import { Needs, Design } from '../types';

const { Title } = Typography;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [recentNeeds, setRecentNeeds] = useState<Needs[]>([]);
  const [recentDesigns, setRecentDesigns] = useState<Design[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [needsRes, designsRes] = await Promise.all([
          needsApi.getAll(),
          designApi.getAll(),
        ]);

        setRecentNeeds(needsRes.data?.needs.slice(0, 5) || []);
        setRecentDesigns(designsRes.data?.designs.slice(0, 5) || []);
      } catch (error) {
        console.error('获取数据失败:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Title level={2}>欢迎使用装修指南</Title>
      
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card
            title="快速开始"
            extra={<Button type="primary" onClick={() => navigate('/needs/new')}>创建需求</Button>}
          >
            <p>
              开始您的装修之旅！创建一个装修需求，我们将为您生成个性化的设计方案。
            </p>
          </Card>
        </Col>

        <Col span={12}>
          <Card
            title="最近需求"
            extra={<Link to="/needs">查看全部</Link>}
          >
            <List
              dataSource={recentNeeds}
              renderItem={(need: Needs) => (
                <List.Item
                  key={need._id}
                  actions={[
                    <Button
                      type="link"
                      onClick={() => navigate(`/needs/${need._id}`)}
                    >
                      查看详情
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    title={need.title}
                    description={`预算: ${need.basicInfo.budget}元 | 时长: ${need.basicInfo.duration}个月`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col span={12}>
          <Card
            title="最近设计"
            extra={<Link to="/designs">查看全部</Link>}
          >
            <List
              dataSource={recentDesigns}
              renderItem={(design: Design) => (
                <List.Item
                  key={design._id}
                  actions={[
                    <Button
                      type="link"
                      onClick={() => navigate(`/designs/${design._id}`)}
                    >
                      查看详情
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    title={design.overview.title}
                    description={`预算: ${design.overview.estimatedCost}元 | 时长: ${design.overview.estimatedDuration}个月`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
