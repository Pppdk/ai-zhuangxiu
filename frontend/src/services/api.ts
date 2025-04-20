import axios from 'axios';
import {
  ApiResponse,
  Needs,
  Design,
  NeedsListResponse,
  DesignsListResponse,
} from '../types';

// 创建 axios 实例
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 需求相关 API
export const needsApi = {
  create: (data: Partial<Needs>) =>
    api.post<ApiResponse<Needs>>('/needs', data).then((res) => res.data),

  getAll: () =>
    api.get<ApiResponse<NeedsListResponse>>('/needs').then((res) => res.data),

  getById: (id: string) =>
    api.get<ApiResponse<Needs>>(`/needs/${id}`).then((res) => res.data),

  update: (id: string, data: Partial<Needs>) =>
    api.put<ApiResponse<Needs>>(`/needs/${id}`, data).then((res) => res.data),

  delete: (id: string) =>
    api.delete<ApiResponse<void>>(`/needs/${id}`).then((res) => res.data),
};

// 设计方案相关 API
export const designApi = {
  create: (data: { needsId: string }) =>
    api.post<ApiResponse<Design>>('/designs', data).then((res) => res.data),

  getAll: () =>
    api.get<ApiResponse<DesignsListResponse>>('/designs').then((res) => res.data),

  getById: (id: string) =>
    api.get<ApiResponse<Design>>(`/designs/${id}`).then((res) => res.data),

  update: (id: string, data: Partial<Design>) =>
    api.put<ApiResponse<Design>>(`/designs/${id}`, data).then((res) => res.data),

  delete: (id: string) =>
    api.delete<ApiResponse<void>>(`/designs/${id}`).then((res) => res.data),

  provideFeedback: (id: string, data: { rating: number; comments: string }) =>
    api.post<ApiResponse<Design>>(`/designs/${id}/feedback`, data).then((res) => res.data),
};

export default api;
