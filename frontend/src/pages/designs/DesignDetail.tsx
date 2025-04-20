import React, { useEffect, useState } from 'react';
import {
  Card,
  Typography,
  Space,
  Descriptions,
  Tabs,
  List,
  Tag,
  Button,
  Rate,
  Input,
  Modal,
  Spin,
  message,
} from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { designApi } from '../../services/api';
import { Design, RoomPlan } from '../../types';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const DesignDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [design, setDesign] = useState<Design | null>(null);
  const [loading, setLoading] = useState(true);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchDesign = async () => {
      if (!id) return;
      try {
        const response = await designApi.getById(id);
        if (response.status === 'success' && response.data) {
          setDesign(response.data);
        }
      } catch (error) {
        message.error('获取设计方案详情失败');
      } finally {
        setLoading(false);
      }
    };

    fetchDesign();
  }, [id]);

  const handleSubmitFeedback = async () => {
    if (!id) return;
    try {
      setSubmitting(true);
      await designApi.provideFeedback(id, { rating, comments });
      message.success('反馈提交成功');
      setFeedbackVisible(false);
      // 重新加载设计方案详情
      const response = await designApi.getById(id);
      if (response.status === 'success' && response.data) {
        setDesign(response.data);
      }
    } catch (error) {
      message.error('提交反馈失败');
    } finally {
      setSubmitting(false);
    }
  };

  const renderRoomPlan = (plan: RoomPlan) => (
    <Card title={plan.room} style={{ marginBottom: 16 }}>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <div>
          <Text strong>空间描述：</Text>
          <Paragraph>{plan.description}</Paragraph>
        </div>

        <div>
          <Text strong>设计建议：</Text>
          <List
            dataSource={plan.suggestions}
            renderItem={(suggestion) => (
              <List.Item>
                <Text>{suggestion}</Text>
              </List.Item>
            )}
          />
        </div>

        <div>
          <Text strong>推荐材料：</Text>
          <List
            dataSource={plan.materials}
            renderItem={(material) => (
              <List.Item>
                <Descriptions column={1}>
                  <Descriptions.Item label="名称">{material.name}</Descriptions.Item>
                  <Descriptions.Item label="类型">{material.type}</Descriptions.Item>
                  <Descriptions.Item label="品牌">{material.brand}</Descriptions.Item>
                  <Descriptions.Item label="价格">
                    ¥ {material.price.toLocaleString()}
                  </Descriptions.Item>
                </Descriptions>
              </List.Item>
            )}
          />
        </div>

        <div>
          <Text strong>预估费用：</Text>
          <Text>¥ {plan.estimatedCost.toLocaleString()}</Text>
        </div>
      </Space>
    </Card>
  );

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!design) {
    return <div>设计方案不存在</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title level={2}>{design.overview.title}</Title>
            {!design.feedback && (
              <Button type="primary" onClick={() => setFeedbackVisible(true)}>
                提供反馈
              </Button>
            )}
          </div>

          <Card title="方案概述" bordered={false}>
            <Descriptions column={2}>
              <Descriptions.Item label="设计风格">
                <Tag color="blue">{design.overview.style}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="总预算">
                ¥ {design.overview.estimatedCost.toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="预计工期">
                {design.overview.estimatedDuration} 个月
              </Descriptions.Item>
              <Descriptions.Item label="版本">
                V{design.version}
              </Descriptions.Item>
            </Descriptions>

            <div style={{ marginTop: 16 }}>
              <Text strong>设计说明：</Text>
              <Paragraph style={{ marginTop: 8 }}>
                {design.overview.description}
              </Paragraph>
            </div>

            {design.feedback && (
              <div style={{ marginTop: 16 }}>
                <Text strong>业主反馈：</Text>
                <div style={{ marginTop: 8 }}>
                  <Rate disabled value={design.feedback.rating} />
                  <Paragraph style={{ marginTop: 8 }}>
                    {design.feedback.comments}
                  </Paragraph>
                </div>
              </div>
            )}
          </Card>

          <Card title="空间设计" bordered={false}>
            <Tabs
              type="card"
              items={design.roomPlans.map((plan, index) => ({
                key: String(index),
                label: plan.room,
                children: renderRoomPlan(plan),
              }))}
            />
          </Card>
        </Space>
      </Card>

      <Modal
        title="提供反馈"
        open={feedbackVisible}
        onOk={handleSubmitFeedback}
        onCancel={() => setFeedbackVisible(false)}
        confirmLoading={submitting}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Text>设计方案评分：</Text>
            <Rate value={rating} onChange={setRating} />
          </div>
          <div>
            <Text>详细意见：</Text>
            <TextArea
              rows={4}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="请输入您对设计方案的具体意见和建议"
            />
          </div>
        </Space>
      </Modal>
    </motion.div>
  );
};

export default DesignDetail;
