import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsInt()
  readonly qty: number;

  @IsNotEmpty()
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
