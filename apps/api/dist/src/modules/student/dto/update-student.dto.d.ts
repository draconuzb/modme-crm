import { CreateStudentDto } from './create-student.dto';
declare const UpdateStudentDto_base: import("@nestjs/common").Type<Partial<Omit<CreateStudentDto, "password">>>;
export declare class UpdateStudentDto extends UpdateStudentDto_base {
}
export {};
