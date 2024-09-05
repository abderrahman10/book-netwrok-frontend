import { FeedbackResponse } from "./FeedbackResponse";

export interface PageResponseFeedbackResponse {
  content?: Array<FeedbackResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}