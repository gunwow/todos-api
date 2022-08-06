import { IsNotEmpty, IsString } from 'class-validator';

export class DocumentDTO {
  @IsNotEmpty()
  @IsString()
  content: string;
}
