
export class ApiResponse<T = void> {
    isOk: boolean;
    data?: T;
    error?: string;
}
