import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Space,
  Tag,
  Typography,
  Card,
  Tooltip,
  Popconfirm,
  message,
} from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { needsApi } from '../../services/api';
import { Needs } from '../../types';

const { Title } = Typography;

const NeedsList: React.FC = () => {
  const navigate = useNavigate();
  const [needs, setNeeds] = useState<Needs[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNeeds = async () => {
    try {
      const response = await needsApi.getAll();
      if (response.status === 'success' && response.data) {
        setNeeds(response.data.needs || []);
      }
    } catch (error) {
      message.error('获取需求列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNeeds();
  }, []);

  const handleDelete = async (_id: string) => {
    try {
      await needsApi.delete(_id);
      message.success('删除成功');
      fetchNeeds();
    } catch (error) {
      message.error('删除失败');
    }
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      draft: 'default',
      processing: 'processing',
      completed: 'success',
    };
    return colors[status] || 'default';
  };

  const columns = [
    {
      title: '房屋类型',
      dataIndex: ['basicInfo', 'houseType'],
      key: 'houseType',
      render: (text: string) => {
        const houseTypes: { [key: string]: string } = {
          apartment: '公寓',
          duplex: '复式',
          villa: '别墅',
          other: '其他',
        };
        return houseTypes[text] || text;
      },
    },
    {
      title: '家庭成员',
      dataIndex: ['basicInfo', 'familyMembers'],
      key: 'familyMembers',
      render: (members: string[]) => members.join(', '),
    },
    {
      title: '预算',
      dataIndex: ['basicInfo', 'budget'],
      key: 'budget',
      render: (budget: number) => `${budget.toLocaleString()} 元`,
      sorter: (a: Needs, b: Needs) => a.basicInfo.budget - b.basicInfo.budget,
    },
    {
      title: '工期',
      dataIndex: ['basicInfo', 'duration'],
      key: 'duration',
      render: (duration: number) => `${duration} 个月`,
      sorter: (a: Needs, b: Needs) => a.basicInfo.duration - b.basicInfo.duration,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {
            {
              draft: '草稿',
              processing: '处理中',
              completed: '已完成',
            }[status]
          }
        </Tag>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
      sorter: (a: Needs, b: Needs) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Needs) => (
        <Space size="middle">
          <Tooltip title="查看详情">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => navigate(`/app/needs/${record._id}`)}
            />
          </Tooltip>
          <Tooltip title="编辑">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => navigate(`/app/needs/${record._id}/edit`)}
            />
          </Tooltip>
          <Tooltip title="删除">
            <Popconfirm
              title="确定要删除这个需求吗？"
              onConfirm={() => handleDelete(record._id)}
              okText="确定"
              cancelText="取消"
            >
              <Button type="text" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title level={2}>装修需求列表</Title>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => navigate('/app/needs/new')}
            >
              创建需求
            </Button>
          </div>

          <Table
            columns={columns}
            dataSource={needs}
            rowKey="_id"
            loading={loading}
            pagination={{
              showSizeChanger: true,
              showTotal: (total) => `共 ${total} 条`,
            }}
          />
        </Space>
      </Card>
    </motion.div>
  );
};

export default NeedsList;
