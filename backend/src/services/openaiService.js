import OpenAI from 'openai';
import logger from '../utils/logger.js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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
5. 施工时间安排`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "你是一位经验丰富的室内设计师，擅长根据客户需求提供专业、详细且实用的装修方案。"
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    // 解析 AI 响应
    const designPlan = response.choices[0].message.content;

    // 将文本响应转换为结构化数据
    const structuredPlan = parseDesignPlan(designPlan);

    return structuredPlan;
  } catch (error) {
    logger.error('OpenAI API 调用失败:', error);
    throw new Error('生成设计方案时出错');
  }
};

// 解析设计方案文本为结构化数据
const parseDesignPlan = (text) => {
  // 这里可以根据实际的 AI 响应格式进行更复杂的解析
  // 当前使用简单的结构
  return {
    overview: {
      title: '个性化装修方案',
      description: text,
      style: '混合风格',
      estimatedCost: 0, // 后续可以通过 AI 或规则计算
      estimatedDuration: 0, // 后续可以通过 AI 或规则计算
    },
    roomPlans: [], // 后续可以通过更复杂的解析逻辑填充
    status: 'generated',
    version: 1,
  };
};
