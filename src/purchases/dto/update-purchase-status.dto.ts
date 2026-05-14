// dto/update-purchase-status.dto.ts
import { TransactionStatus } from "@prisma/client";
import { IsEnum, IsNotEmpty } from "class-validator";

export class UpdatePurchaseStatusDto {
  @IsNotEmpty()
  @IsEnum(TransactionStatus)
  status: TransactionStatus;
}