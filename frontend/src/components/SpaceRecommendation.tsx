import React from 'react';
import { Card, Typography, Space, Image, Row, Col, Tag, Tabs } from 'antd';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const StyledCard = styled(motion(Card))`
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 24px;
  
  .ant-tabs-nav {
    margin-bottom: 24px;
  }
  
  .ant-tabs-tab {
    padding: 12px 24px;
    margin: 0 !important;
  }
  
  .ant-tabs-tab-active {
    background: #e6f7ff;
    border-radius: 8px 8px 0 0;
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 16px;
  
  .image-container {
    position: relative;
    height: 200px;
    border-radius: 8px;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .image-tag {
      position: absolute;
      bottom: 8px;
      left: 8px;
      background: rgba(0, 0, 0, 0.6);
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
    }
  }
`;

const KeywordTag = styled(Tag)`
  margin: 4px;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 14px;
`;

export interface SpaceDetail {
  title: string;
  description: string;
  keywords: Array<{
    text: string;
    color: string;
  }>;
  images: Array<{
    url: string;
    caption: string;
  }>;
  tips: string[];
}

export const spaceRecommendations: Record<string, SpaceDetail> = {
  living: {
    title: '客厅改造建议',
    description: '客厅是家庭生活的中心，需要兼顾美观与实用性。建议采用开放式设计，增加空间感和通透性。',
    keywords: [
      { text: '开放通透', color: '#1890ff' },
      { text: '多功能区域', color: '#52c41a' },
      { text: '自然采光', color: '#faad14' },
      { text: '收纳整洁', color: '#722ed1' }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb3',
        caption: '明亮开放式客厅'
      },
      {
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
        caption: '休闲阅读区'
      }
    ],
    tips: [
      '合理布局沙发和电视墙，保证观看舒适度',
      '设计灵活的收纳空间，保持整洁',
      '选择适合全家人的照明方案',
      '预留活动空间，方便家人互动'
    ]
  },
  bedroom: {
    title: '卧室改造建议',
    description: '卧室是休息放松的私密空间，应该营造温馨舒适的氛围，注重睡眠质量的提升。',
    keywords: [
      { text: '私密舒适', color: '#722ed1' },
      { text: '柔和光线', color: '#eb2f96' },
      { text: '安静隔音', color: '#52c41a' },
      { text: '个性化设计', color: '#1890ff' }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87',
        caption: '温馨主卧设计'
      },
      {
        url: 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3',
        caption: '卧室收纳区'
      }
    ],
    tips: [
      '选择适合的床垫和枕头，提升睡眠质量',
      '设计步入式衣柜，增加收纳空间',
      '使用遮光窗帘，调节光线',
      '注意床头柜和阅读区的实用性'
    ]
  },
  kitchen: {
    title: '厨房改造建议',
    description: '厨房需要注重功能性和效率，合理的动线规划和收纳设计是关键。',
    keywords: [
      { text: '动线流畅', color: '#52c41a' },
      { text: '易清洁', color: '#1890ff' },
      { text: '收纳充足', color: '#faad14' },
      { text: '通风良好', color: '#f5222d' }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4',
        caption: '现代开放式厨房'
      },
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
        caption: '厨房收纳设计'
      }
    ],
    tips: [
      '规划合理的工作三角区',
      '选择耐用防水的台面材料',
      '增加充足的储物空间',
      '安装高效的抽油烟设备'
    ]
  },
  bathroom: {
    title: '卫生间改造建议',
    description: '卫生间的设计要注重防水、通风和易清洁，同时创造轻松愉悦的沐浴空间。',
    keywords: [
      { text: '防水防滑', color: '#1890ff' },
      { text: '通风干爽', color: '#52c41a' },
      { text: '空间利用', color: '#faad14' },
      { text: '明亮整洁', color: '#eb2f96' }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea',
        caption: '现代简约卫浴'
      },
      {
        url: 'https://images.unsplash.com/photo-1600566752447-f4e455c05115',
        caption: '卫浴收纳方案'
      }
    ],
    tips: [
      '选择防滑地砖，确保安全',
      '安装好的排水和防水系统',
      '规划足够的收纳空间',
      '注意照明和镜子的设计'
    ]
  },
  study: {
    title: '书房改造建议',
    description: '书房是工作和学习的专注空间，需要安静舒适的环境和人体工学设计。',
    keywords: [
      { text: '专注安静', color: '#722ed1' },
      { text: '人体工学', color: '#52c41a' },
      { text: '收纳有序', color: '#1890ff' },
      { text: '照明充足', color: '#faad14' }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3',
        caption: '舒适书房设计'
      },
      {
        url: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87',
        caption: '书房收纳展示'
      }
    ],
    tips: [
      '选择符合人体工学的座椅和桌子',
      '设计充足的书架和收纳空间',
      '注意自然采光和照明设计',
      '考虑隔音处理，保持安静环境'
    ]
  }
};

interface SpaceRecommendationProps {
  selectedSpace?: string;
  onSpaceChange?: (space: string) => void;
}

const SpaceRecommendation: React.FC<SpaceRecommendationProps> = ({
  selectedSpace = 'living',
  onSpaceChange
}) => {
  const space = spaceRecommendations[selectedSpace];

  return (
    <StyledCard>
      <Tabs
        activeKey={selectedSpace}
        onChange={key => onSpaceChange?.(key)}
        type="card"
      >
        {Object.entries(spaceRecommendations).map(([key, value]) => (
          <TabPane tab={value.title} key={key}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Paragraph>{value.description}</Paragraph>

              <div>
                <Title level={5}>关键特点</Title>
                <Space wrap>
                  {value.keywords.map((keyword, index) => (
                    <KeywordTag key={index} color={keyword.color}>
                      {keyword.text}
                    </KeywordTag>
                  ))}
                </Space>
              </div>

              <div>
                <Title level={5}>设计参考</Title>
                <ImageGrid>
                  {value.images.map((image, index) => (
                    <div key={index} className="image-container">
                      <Image
                        src={image.url}
                        alt={image.caption}
                        preview={false}
                      />
                      <div className="image-tag">{image.caption}</div>
                    </div>
                  ))}
                </ImageGrid>
              </div>

              <div>
                <Title level={5}>改造建议</Title>
                <ul style={{ paddingLeft: 20 }}>
                  {value.tips.map((tip, index) => (
                    <li key={index}>
                      <Text>{tip}</Text>
                    </li>
                  ))}
                </ul>
              </div>
            </Space>
          </TabPane>
        ))}
      </Tabs>
    </StyledCard>
  );
};

export default SpaceRecommendation;
