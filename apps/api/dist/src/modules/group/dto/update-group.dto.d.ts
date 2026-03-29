import { CreateGroupDto } from './create-group.dto';
export declare enum GroupStatusEnum {
    ACTIVE = "ACTIVE",
    ARCHIVED = "ARCHIVED",
    COMPLETED = "COMPLETED"
}
declare const UpdateGroupDto_base: import("@nestjs/common").Type<Partial<CreateGroupDto>>;
export declare class UpdateGroupDto extends UpdateGroupDto_base {
    status?: GroupStatusEnum;
}
export {};
