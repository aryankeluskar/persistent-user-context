import axios, { AxiosInstance } from 'axios';
import type {
  AddMemoryRequest,
  AddMemoryResponse,
  GetProfileRequest,
  GetProfileResponse,
  ListMemoriesRequest,
  ListMemoriesResponse,
} from '../types/supermemory';

const API_BASE_URL = 'https://api.supermemory.ai';

class SupermemoryService {
  private client: AxiosInstance;

  constructor(apiKey: string) {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Add a new memory/document to Supermemory
   */
  async addMemory(request: AddMemoryRequest): Promise<AddMemoryResponse> {
    const response = await this.client.post<AddMemoryResponse>(
      '/v3/documents',
      request
    );
    return response.data;
  }

  /**
   * Get user profile (static and dynamic)
   */
  async getProfile(request: GetProfileRequest): Promise<GetProfileResponse> {
    const response = await this.client.post<GetProfileResponse>(
      '/v4/profile',
      request
    );
    return response.data;
  }

  /**
   * List all documents/memories
   */
  async listMemories(request: ListMemoriesRequest = {}): Promise<ListMemoriesResponse> {
    const response = await this.client.post<ListMemoriesResponse>(
      '/v3/documents/list',
      request
    );
    return response.data;
  }
}

// Export a singleton instance
const apiKey = import.meta.env.VITE_SUPERMEMORY_API_KEY || '';
export const supermemoryService = new SupermemoryService(apiKey);

// Also export the class for testing purposes
export { SupermemoryService };
