import { CreateTeacherDto } from './create-teacher.dto';
declare const UpdateTeacherDto_base: import("@nestjs/common").Type<Partial<Omit<CreateTeacherDto, "password">>>;
export declare class UpdateTeacherDto extends UpdateTeacherDto_base {
}
export {};
