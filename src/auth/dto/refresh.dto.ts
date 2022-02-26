import { IsJWT, IsNotEmpty, IsString } from 'class-validator';

export class RefreshDTO {
  @IsNotEmpty()
  @IsString()
  @IsJWT()
  refreshToken: string;
}
