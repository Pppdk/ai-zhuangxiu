import { ZhipuAI } from 'zhipuai';
import logger from '../utils/logger.js';

const client = new ZhipuAI({
  apiKey: 'dcdff28956064e938affc960bf554090.5C3UCzkeja2HBbPx'
});

export const generateDesignPlan = async (needs) => {
  try {
    const { basicInfo, painPoints, roomPreferences, designStyles, customNeeds } = needs;

    // 构建提示词
    const prompt = `作为一个专业的室内设计师，请根据以下需求生成一个详细的装修方案：

基本信息：
- 住所类型：${basicInfo.houseType}
- 家庭成员：${basicInfo.familyMembers.join(', ')}
- 装修时长：${basicInfo.duration}个月
- 装修预算：${basicInfo.budget}元

主要痛点：
${painPoints.map(point => '- ' + point).join('\n')}

房间偏好：
${Array.from(roomPreferences.entries()).map(([room, rating]) => 
  `- ${room}: ${rating}星级重要度`
).join('\n')}

期望风格：
${designStyles.join(', ')}

特殊需求：
${customNeeds}

请提供：
1. 整体设计概述
2. 各个房间的具体设计方案
3. 推荐的材料和品牌
4. 预算分配建议
5. 施工时间安排

请以结构化的 JSON 格式返回，包含以下字段：
{
  "overview": {
    "title": "方案标题",
    "description": "整体设计概述",
    "style": "主要设计风格",
    "estimatedCost": "预估总成本",
    "estimatedDuration": "预估工期(月)"
  },
  "roomPlans": [
    {
      "room": "房间名称",
      "description": "设计说明",
      "suggestions": ["具体建议1", "具体建议2"],
      "materials": [
        {
          "name": "材料名称",
          "type": "材料类型",
          "brand": "推荐品牌",
          "price": "预估价格"
        }
      ],
      "estimatedCost": "该房间预估成本"
    }
  ]
}`;

    const response = await client.chat.completions.create({
      model: "glm-4-plus",
      messages: [
        {
          role: "system",
          content: "你是一位经验丰富的室内设计师，擅长根据客户需求提供专业、详细且实用的装修方案。请始终以JSON格式返回结果。"
        },
        {
          role: "user",
          content: prompt
        }
      ],
    });

    // 解析 AI 响应
    const designPlan = response.choices[0].message.content;
    
    try {
      // 尝试解析 JSON
      const parsedPlan = JSON.parse(designPlan);
      return {
        ...parsedPlan,
        status: 'generated',
        version: 1,
      };
    } catch (error) {
      // 如果解析失败，返回原始文本
      logger.error('解析设计方案失败:', error);
      return {
        overview: {
          title: '个性化装修方案',
          description: designPlan,
          style: designStyles.join(', '),
          estimatedCost: basicInfo.budget,
          estimatedDuration: basicInfo.duration,
        },
        roomPlans: [],
        status: 'generated',
        version: 1,
      };
    }
  } catch (error) {
    logger.error('智谱 AI API 调用失败:', error);
    throw new Error('生成设计方案时出错');
  }
};
