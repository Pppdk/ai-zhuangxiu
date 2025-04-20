import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Select,
  InputNumber,
  Button,
  Card,
  Space,
  Typography,
  message,
} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { needsApi } from '../../services/api';
import { Needs, BasicInfo, RoomInfo, StylePreference } from '../../types';

const { Title } = Typography;
const { Option } = Select;

const HOUSE_TYPES = [
  '公寓',
  '复式',
  '别墅',
  '其他',
];

const DESIGN_STYLES = [
  '现代简约',
  '北欧风格',
  '日式和风',
  '美式乡村',
  '中式古典',
  '工业风格',
  '地中海风格',
  '轻奢风格',
];

const COLORS = [
  '白色',
  '灰色',
  '黑色',
  '原木色',
  '米色',
  '蓝色',
  '绿色',
];

const MATERIALS = [
  '实木',
  '大理石',
  '玻璃',
  '金属',
  '布艺',
  '皮革',
  '瓷砖',
];

interface FormValues {
  title: string;
  basicInfo: BasicInfo;
  roomInfo: RoomInfo[];
  stylePreference: StylePreference;
  additionalRequirements?: string;
}

const NeedsForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm<FormValues>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNeedsDetail = async () => {
      if (!id) return;
      try {
        const response = await needsApi.getById(id);
        if (response.status === 'success' && response.data) {
          form.setFieldsValue(response.data);
        }
      } catch (error) {
        message.error('获取需求详情失败');
      }
    };

    fetchNeedsDetail();
  }, [id, form]);

  const handleSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      if (id) {
        await needsApi.update(id, values);
        message.success('更新成功');
      } else {
        await needsApi.create(values);
        message.success('创建成功');
      }
      navigate('/app/needs');
    } catch (error) {
      message.error('保存失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Title level={2}>{id ? '编辑需求' : '创建需求'}</Title>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
          >
            <Form.Item
              label="需求标题"
              name="title"
              rules={[{ required: true, message: '请输入需求标题' }]}
            >
              <Input placeholder="请输入需求标题，如：三居室现代简约风格装修" />
            </Form.Item>

            <Card title="基本信息" bordered={false}>
              <Form.Item
                label="房屋类型"
                name={['basicInfo', 'houseType']}
                rules={[{ required: true, message: '请选择房屋类型' }]}
              >
                <Select>
                  {HOUSE_TYPES.map((type) => (
                    <Option key={type} value={type}>
                      {type}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="家庭成员"
                name={['basicInfo', 'familyMembers']}
                rules={[{ required: true, message: '请输入家庭成员' }]}
              >
                <Select mode="tags" placeholder="请输入家庭成员，按回车键确认">
                  <Option value="父母">父母</Option>
                  <Option value="子女">子女</Option>
                  <Option value="老人">老人</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="装修预算（元）"
                name={['basicInfo', 'budget']}
                rules={[{ required: true, message: '请输入装修预算' }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  min={50000}
                  max={10000000}
                  step={10000}
                  formatter={(value) => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value): 50000 | 10000000 => {
                    const num = parseInt(value!.replace(/\¥\s?|(,*)/g, ''));
                    if (num >= 50000 && num <= 10000000) {
                      return num as 50000 | 10000000;
                    }
                    return 50000;
                  }}
                />
              </Form.Item>

              <Form.Item
                label="装修工期（月）"
                name={['basicInfo', 'duration']}
                rules={[{ required: true, message: '请输入装修工期' }]}
              >
                <InputNumber style={{ width: '100%' }} min={1} max={24} />
              </Form.Item>
            </Card>

            <Card title="房间信息" bordered={false}>
              <Form.List name="roomInfo">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field, index) => (
                      <Card
                        key={field.key}
                        size="small"
                        title={`房间 ${index + 1}`}
                        extra={
                          <Button danger onClick={() => remove(field.name)}>
                            删除
                          </Button>
                        }
                        style={{ marginBottom: 16 }}
                      >
                        <Form.Item
                          {...field}
                          label="房间名称"
                          name={[field.name, 'name']}
                          rules={[{ required: true, message: '请输入房间名称' }]}
                        >
                          <Input placeholder="如：客厅、主卧、书房等" />
                        </Form.Item>

                        <Form.Item
                          {...field}
                          label="面积（平方米）"
                          name={[field.name, 'area']}
                          rules={[{ required: true, message: '请输入房间面积' }]}
                        >
                          <InputNumber
                            style={{ width: '100%' }}
                            min={1}
                            max={200}
                            placeholder="请输入房间面积"
                          />
                        </Form.Item>

                        <Form.Item
                          {...field}
                          label="具体需求"
                          name={[field.name, 'requirements']}
                          rules={[{ required: true, message: '请输入具体需求' }]}
                        >
                          <Select
                            mode="tags"
                            style={{ width: '100%' }}
                            placeholder="请输入具体需求，如：需要飘窗、需要衣帽间等"
                          />
                        </Form.Item>
                      </Card>
                    ))}

                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block>
                        添加房间
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Card>

            <Card title="风格偏好" bordered={false}>
              <Form.Item
                label="设计风格"
                name={['stylePreference', 'style']}
                rules={[{ required: true, message: '请选择设计风格' }]}
              >
                <Select placeholder="请选择设计风格">
                  {DESIGN_STYLES.map((style) => (
                    <Option key={style} value={style}>
                      {style}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="颜色偏好"
                name={['stylePreference', 'colors']}
                rules={[{ required: true, message: '请选择颜色偏好' }]}
              >
                <Select mode="multiple" placeholder="请选择颜色偏好">
                  {COLORS.map((color) => (
                    <Option key={color} value={color}>
                      {color}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="材料偏好"
                name={['stylePreference', 'materials']}
                rules={[{ required: true, message: '请选择材料偏好' }]}
              >
                <Select mode="multiple" placeholder="请选择材料偏好">
                  {MATERIALS.map((material) => (
                    <Option key={material} value={material}>
                      {material}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Card>

            <Form.Item
              label="其他需求"
              name="additionalRequirements"
            >
              <Input.TextArea
                rows={4}
                placeholder="请输入其他需求，如：需要定制家具、需要智能家居等"
              />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit" loading={loading}>
                  {id ? '更新' : '创建'}
                </Button>
                <Button onClick={() => navigate('/app/needs')}>取消</Button>
              </Space>
            </Form.Item>
          </Form>
        </Space>
      </Card>
    </motion.div>
  );
};

export default NeedsForm;
