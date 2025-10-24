// Supermemory API Types

export type ProcessingStatus =
  | 'queued'
  | 'extracting'
  | 'chunking'
  | 'embedding'
  | 'indexing'
  | 'done'
  | 'failed';

export type MemoryType =
  | 'text'
  | 'pdf'
  | 'webpage'
  | 'video'
  | 'image';

export interface Memory {
  id: string;
  connectionId: string | null;
  createdAt: string;
  updatedAt: string;
  customId: string | null;
  title: string | null;
  summary: string | null;
  status: ProcessingStatus;
  type: MemoryType;
  metadata: Record<string, any> | null;
  containerTags: string[];
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  limit: number;
}

export interface ListMemoriesResponse {
  memories: Memory[];
  pagination: Pagination;
}

export interface AddMemoryRequest {
  content: string;
  containerTag: string;
  metadata?: Record<string, any>;
}

export interface AddMemoryResponse {
  id: string;
  status: ProcessingStatus;
}

export interface Profile {
  static: string[];
  dynamic: string[];
}

export interface GetProfileRequest {
  containerTag: string;
  q?: string;
}

export interface GetProfileResponse {
  profile: Profile;
  searchResults?: {
    results: any[];
    total: number;
    timing: number;
  };
}

export interface ListMemoriesRequest {
  limit?: number;
  page?: number;
  containerTags?: string[];
  sort?: 'createdAt' | 'updatedAt';
  order?: 'asc' | 'desc';
  filters?: string;
}
