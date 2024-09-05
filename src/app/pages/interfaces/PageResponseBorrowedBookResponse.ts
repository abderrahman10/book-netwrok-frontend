import { BorrowedBookResponse } from "./BorrowedBookResponse";

export interface PageResponseBorrowedBookResponse {
    content?: Array<BorrowedBookResponse>;
    first?: boolean;
    last?: boolean;
    number?: number;
    size?: number;
    totalElements?: number;
    totalPages?: number;
  }