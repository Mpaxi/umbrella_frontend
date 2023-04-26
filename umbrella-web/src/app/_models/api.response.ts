import { User } from "./user";

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T
}
