import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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

  @IsNotEmpty()
  @IsString()
  readonly part_number: string;

  @IsOptional()
  @IsString()
  readonly dimension: string;

  @IsOptional()
  @IsNumber()
  readonly weight: number;

  @IsOptional()
  @IsString()
  readonly manufacturer: string;

  @IsOptional()
  @IsString()
  readonly origin: string;
}
