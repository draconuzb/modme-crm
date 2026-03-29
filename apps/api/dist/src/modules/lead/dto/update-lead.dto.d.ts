import { CreateLeadDto } from './create-lead.dto';
export declare enum LeadStatusEnum {
    LEAD = "LEAD",
    EXPECTATION = "EXPECTATION",
    SET = "SET"
}
declare const UpdateLeadDto_base: import("@nestjs/common").Type<Partial<CreateLeadDto>>;
export declare class UpdateLeadDto extends UpdateLeadDto_base {
    status?: LeadStatusEnum;
    assignedToId?: number;
}
export {};
