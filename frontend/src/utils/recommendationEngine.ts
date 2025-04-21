import { stylePresets } from '../components/StyleSuggestion';

interface UserPreferences {
  houseType: string;
  size: number;
  familySize: number;
  budget: number;
  timeline: string;
  lifestyle?: string[];
  priorities?: string[];
  activities?: string[];
}

export interface StyleScore {
  styleName: keyof typeof stylePresets;
  score: number;
  reasons: string[];
}

type StyleKey = keyof typeof stylePresets;
type StyleWeights = Record<StyleKey, number>;
type WeightMap = Record<string, StyleWeights>;

class RecommendationEngine {
  // 生活方式权重
  private lifestyleWeights: WeightMap = {
    'active': { modern: 0.8, natural: 0.6, nordic: 0.7 },
    'relaxed': { modern: 0.5, natural: 0.9, nordic: 0.8 },
    'social': { modern: 0.7, natural: 0.6, nordic: 0.5 },
    'private': { modern: 0.6, natural: 0.7, nordic: 0.9 },
  };

  // 房型权重
  private houseTypeWeights: WeightMap = {
    'apartment': { modern: 0.9, natural: 0.7, nordic: 0.8 },
    'villa': { modern: 0.7, natural: 0.9, nordic: 0.8 },
    'studio': { modern: 0.95, natural: 0.6, nordic: 0.85 },
  };

  // 预算权重
  private getBudgetWeight(budget: number, style: StyleKey): number {
    const budgetPerSqm = budget * 10000; // 转换为元
    switch (style) {
      case 'modern':
        return budgetPerSqm >= 3000 ? 0.9 : 0.6;
      case 'natural':
        return budgetPerSqm >= 2500 ? 0.8 : 0.7;
      case 'nordic':
        return budgetPerSqm >= 2000 ? 0.85 : 0.75;
      default:
        return 0.7;
    }
  }

  // 面积权重
  private getSizeWeight(size: number, style: StyleKey): number {
    switch (style) {
      case 'modern':
        return size >= 90 ? 0.9 : 0.7;
      case 'natural':
        return size >= 70 ? 0.85 : 0.8;
      case 'nordic':
        return size >= 50 ? 0.8 : 0.9;
      default:
        return 0.7;
    }
  }

  // 家庭成员数权重
  private getFamilySizeWeight(familySize: number, style: StyleKey): number {
    switch (style) {
      case 'modern':
        return familySize <= 2 ? 0.9 : 0.7;
      case 'natural':
        return familySize >= 3 ? 0.9 : 0.7;
      case 'nordic':
        return familySize <= 3 ? 0.85 : 0.75;
      default:
        return 0.7;
    }
  }

  // 计算风格得分
  public calculateStyleScores(preferences: UserPreferences): StyleScore[] {
    const scores: StyleScore[] = [];
    const styles = Object.keys(stylePresets) as StyleKey[];

    styles.forEach(style => {
      let score = 0;
      const reasons: string[] = [];

      // 计算房型权重
      const houseTypeWeight = 
        this.houseTypeWeights[preferences.houseType]?.[style] || 0.7;
      score += houseTypeWeight;
      if (houseTypeWeight > 0.8) {
        reasons.push(`该风格非常适合${preferences.houseType}户型`);
      }

      // 计算预算权重
      const budgetWeight = this.getBudgetWeight(preferences.budget, style);
      score += budgetWeight;
      if (budgetWeight > 0.8) {
        reasons.push('您的预算能够很好地支持这种风格的装修');
      }

      // 计算面积权重
      const sizeWeight = this.getSizeWeight(preferences.size, style);
      score += sizeWeight;
      if (sizeWeight > 0.8) {
        reasons.push('这种风格能充分利用您的房屋面积');
      }

      // 计算家庭成员数权重
      const familySizeWeight = this.getFamilySizeWeight(preferences.familySize, style);
      score += familySizeWeight;
      if (familySizeWeight > 0.8) {
        reasons.push('这种风格非常适合您的家庭结构');
      }

      // 生活方式权重（如果有）
      if (preferences.lifestyle) {
        preferences.lifestyle.forEach(life => {
          const lifestyleWeight = 
            this.lifestyleWeights[life]?.[style] || 0.7;
          score += lifestyleWeight;
          if (lifestyleWeight > 0.8) {
            reasons.push(`非常适合${life}的生活方式`);
          }
        });
      }

      // 归一化得分
      const normalizedScore = (score / (4 + (preferences.lifestyle?.length || 0))) * 100;

      scores.push({
        styleName: style,
        score: Math.round(normalizedScore),
        reasons: reasons
      });
    });

    // 按得分排序
    return scores.sort((a, b) => b.score - a.score);
  }

  // 获取空间布局建议
  public getSpaceRecommendations(preferences: UserPreferences) {
    const recommendations = {
      layout: [] as string[],
      features: [] as string[],
      warnings: [] as string[]
    };

    // 根据面积和家庭人数提供建议
    if (preferences.size < 50) {
      recommendations.layout.push('建议采用开放式设计，增加空间感');
      recommendations.features.push('多功能家具');
      recommendations.warnings.push('注意避免过大的家具');
    } else if (preferences.size < 90) {
      recommendations.layout.push('可以考虑半开放式设计');
      recommendations.features.push('灵活的隔断系统');
    } else {
      recommendations.layout.push('可以划分独立的功能区');
      recommendations.features.push('独立的储物空间');
    }

    if (preferences.familySize >= 4) {
      recommendations.layout.push('建议增加储物空间');
      recommendations.features.push('多人共用空间的合理规划');
    }

    return recommendations;
  }
}

export const recommendationEngine = new RecommendationEngine();
