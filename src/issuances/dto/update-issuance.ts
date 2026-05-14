import { PartialType } from '@nestjs/mapped-types';
import { CreateIssuanceDto } from './create-issuance';

export class UpdateIssuanceDto extends PartialType(CreateIssuanceDto) {}