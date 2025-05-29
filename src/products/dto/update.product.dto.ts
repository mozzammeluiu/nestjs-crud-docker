import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsInt()
  readonly qty: number;

  @IsOptional()
  @IsNumber()
  readonly price: number;
}
