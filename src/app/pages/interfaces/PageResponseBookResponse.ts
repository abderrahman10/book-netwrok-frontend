import { BookResponse } from "./BookResponse";

export interface PageResponseBookResponse {
    content?: Array<BookResponse>;
    first?: boolean;
    last?: boolean;
    number?: number;
    size?: number;
    totalElements?: number;
    totalPages?: number;
  }
  