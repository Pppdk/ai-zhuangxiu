// 需求相关类型
export interface BasicInfo {
  houseType: string;
  area: number;
  budget: number;
  duration: number;
  familyMembers: string[];
}

export interface RoomInfo {
  name: string;
  area: number;
  requirements: string[];
}

export interface StylePreference {
  style: string;
  colors: string[];
  materials: string[];
  examples: string[];
}

export interface Needs {
  _id: string;
  title: string;
  basicInfo: BasicInfo;
  roomInfo: RoomInfo[];
  stylePreference: StylePreference;
  additionalRequirements?: string;
  status: 'draft' | 'submitted' | 'processing' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface NeedsListResponse {
  needs: Needs[];
  total: number;
}

// 设计方案相关类型
export interface Material {
  name: string;
  type: string;
  brand: string;
  price: number;
}

export interface RoomPlan {
  room: string;
  description: string;
  suggestions: string[];
  materials: Material[];
  estimatedCost: number;
}

export interface DesignOverview {
  title: string;
  style: string;
  description: string;
  estimatedCost: number;
  estimatedDuration: number;
}

export interface DesignFeedback {
  rating: number;
  comments: string;
  createdAt: string;
}

export interface Design {
  _id: string;
  user: string;
  needs: string;
  overview: DesignOverview;
  roomPlans: RoomPlan[];
  version: number;
  feedback?: DesignFeedback;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface DesignsListResponse {
  designs: Design[];
}

// API 响应类型
export interface ApiResponse<T> {
  status: 'success' | 'error';
  data: T;
  message?: string;
}
