import { Advocate } from './Advocate';

export interface PaginationState {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface AdvocatesApiResponse {
  data: Advocate[];
  pagination: PaginationState;
}
