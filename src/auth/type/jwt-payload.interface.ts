export interface IJwtPayload {
  userId: string;
  data?: string;
  isRefresh?: boolean;
}
