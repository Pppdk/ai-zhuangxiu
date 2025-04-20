import React, { useEffect, useState } from 'react';
import {
  Card,
  List,
  Space,
  Typography,
  Tag,
  Button,
  Rate,
  Tooltip,
  Empty,
  Spin,
  message,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { EyeOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { designApi } from '../../services/api';
import { Design } from '../../types';

const { Title, Text } = Typography;

const DesignList: React.FC = () => {
  const navigate = useNavigate();
  const [designs, setDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const response = await designApi.getAll();
        if (response.status === 'success' && response.data) {
          setDesigns(response.data.designs || []);
        }
      } catch (error) {
        message.error('获取设计方案列表失败');
      } finally {
        setLoading(false);
      }
    };

    fetchDesigns();
  }, []);

  const getStatusTag = (status: string) => {
    const statusConfig = {
      generated: { color: 'processing', text: '已生成' },
      reviewed: { color: 'warning', text: '已审核' },
      approved: { color: 'success', text: '已确认' },
      rejected: { color: 'error', text: '已拒绝' },
    };
    const config = statusConfig[status as keyof typeof statusConfig] || { color: 'default', text: '未知' };
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Title level={2}>设计方案列表</Title>

          {designs.length === 0 ? (
            <Empty
              description="暂无设计方案"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          ) : (
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 1,
                md: 2,
                lg: 2,
                xl: 3,
                xxl: 3,
              }}
              dataSource={designs}
              renderItem={(design) => (
                <List.Item>
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card
                      hoverable
                      actions={[
                        <Tooltip title="查看详情">
                          <Button
                            type="text"
                            icon={<EyeOutlined />}
                            onClick={() => navigate(`/app/designs/${design._id}`)}
                          >
                            查看详情
                          </Button>
                        </Tooltip>,
                      ]}
                    >
                      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                        <div>
                          <Title level={4} style={{ marginBottom: 8 }}>
                            {design.overview.title}
                          </Title>
                          {getStatusTag(design.status)}
                        </div>

                        <div>
                          <Text type="secondary">设计风格：</Text>
                          <Tag color="blue">{design.overview.style}</Tag>
                        </div>

                        <div>
                          <Text type="secondary">预算：</Text>
                          <Text strong>
                            ¥ {design.overview.estimatedCost.toLocaleString()}
                          </Text>
                        </div>

                        <div>
                          <Text type="secondary">工期：</Text>
                          <Text>{design.overview.estimatedDuration} 个月</Text>
                        </div>

                        {design.feedback && (
                          <div>
                            <Rate
                              disabled
                              value={design.feedback.rating}
                              style={{ fontSize: 14 }}
                            />
                            <Text type="secondary" style={{ marginLeft: 8 }}>
                              {design.feedback.comments}
                            </Text>
                          </div>
                        )}

                        <div>
                          <Text type="secondary">
                            创建时间：{new Date(design.createdAt).toLocaleDateString()}
                          </Text>
                        </div>
                      </Space>
                    </Card>
                  </motion.div>
                </List.Item>
              )}
            />
          )}
        </Space>
      </Card>
    </motion.div>
  );
};

export default DesignList;
