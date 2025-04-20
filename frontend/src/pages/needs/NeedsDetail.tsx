import React, { useEffect, useState } from 'react';
import {
  Card,
  Descriptions,
  Button,
  Space,
  Tag,
  Typography,
  Divider,
  Row,
  Col,
  Progress,
  Spin,
  message,
} from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { EditOutlined, DeleteOutlined, BulbOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { needsApi, designApi } from '../../services/api';
import { Needs } from '../../types';

const { Title, Text } = Typography;

const NeedsDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [needs, setNeeds] = useState<Needs | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const fetchNeedsDetail = async () => {
      if (!id) return;
      try {
        const response = await needsApi.getById(id);
        if (response.status === 'success' && response.data) {
          setNeeds(response.data);
        }
      } catch (error) {
        message.error('获取需求详情失败');
      } finally {
        setLoading(false);
      }
    };

    fetchNeedsDetail();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    try {
      await needsApi.delete(id);
      message.success('删除成功');
      navigate('/app/needs');
    } catch (error) {
      message.error('删除失败');
    }
  };

  const handleGenerateDesign = async () => {
    if (!id) return;
    try {
      setGenerating(true);
      const response = await designApi.create({ needsId: id });
      if (response.status === 'success' && response.data) {
        message.success('设计方案生成成功');
        navigate(`/app/designs/${response.data._id}`);
      }
    } catch (error) {
      message.error('生成设计方案失败');
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!needs) {
    return <div>需求不存在</div>;
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
            <Title level={2}>{needs.title || '需求详情'}</Title>
            <Space>
              <Button
                type="primary"
                icon={<BulbOutlined />}
                onClick={handleGenerateDesign}
                loading={generating}
              >
                生成设计方案
              </Button>
              <Button
                icon={<EditOutlined />}
                onClick={() => navigate(`/app/needs/${id}/edit`)}
              >
                编辑
              </Button>
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={handleDelete}
              >
                删除
              </Button>
            </Space>
          </div>

          <Card title="基本信息" bordered={false}>
            <Descriptions column={2}>
              <Descriptions.Item label="房屋类型">
                {needs.basicInfo.houseType}
              </Descriptions.Item>
              <Descriptions.Item label="家庭成员">
                {needs.basicInfo.familyMembers.join('、')}
              </Descriptions.Item>
              <Descriptions.Item label="装修预算">
                ¥ {needs.basicInfo.budget.toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="装修工期">
                {needs.basicInfo.duration} 个月
              </Descriptions.Item>
            </Descriptions>
          </Card>

          <Card title="装修偏好" bordered={false}>
            <Row gutter={[24, 24]}>
              <Col span={12}>
                <div>
                  <Text strong>房间信息：</Text>
                  <div style={{ marginTop: 16 }}>
                    {needs.roomInfo.map((room) => (
                      <Card key={room.name} size="small" style={{ marginBottom: 16 }}>
                        <Descriptions column={1}>
                          <Descriptions.Item label="房间">
                            {room.name}
                          </Descriptions.Item>
                          <Descriptions.Item label="面积">
                            {room.area} 平方米
                          </Descriptions.Item>
                          <Descriptions.Item label="需求">
                            {room.requirements.map((req) => (
                              <Tag key={req} style={{ marginBottom: 4 }}>
                                {req}
                              </Tag>
                            ))}
                          </Descriptions.Item>
                        </Descriptions>
                      </Card>
                    ))}
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div>
                  <Text strong>风格偏好：</Text>
                  <Card size="small" style={{ marginTop: 16 }}>
                    <Descriptions column={1}>
                      <Descriptions.Item label="风格">
                        <Tag color="blue">{needs.stylePreference.style}</Tag>
                      </Descriptions.Item>
                      <Descriptions.Item label="颜色">
                        {needs.stylePreference.colors.map((color) => (
                          <Tag key={color}>{color}</Tag>
                        ))}
                      </Descriptions.Item>
                      <Descriptions.Item label="材料">
                        {needs.stylePreference.materials.map((material) => (
                          <Tag key={material}>{material}</Tag>
                        ))}
                      </Descriptions.Item>
                    </Descriptions>
                  </Card>
                </div>
              </Col>
            </Row>

            {needs.additionalRequirements && (
              <>
                <Divider />
                <div>
                  <Text strong>其他需求：</Text>
                  <p style={{ marginTop: 8 }}>{needs.additionalRequirements}</p>
                </div>
              </>
            )}
          </Card>
        </Space>
      </Card>
    </motion.div>
  );
};

export default NeedsDetail;
