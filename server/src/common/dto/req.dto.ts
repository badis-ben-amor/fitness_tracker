import { IsInt, IsNotEmpty } from 'class-validator';

export class ReqDto {
  @IsInt()
  @IsNotEmpty()
  user: { id: number };
}
