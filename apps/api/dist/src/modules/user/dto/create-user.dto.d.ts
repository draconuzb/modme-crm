export declare enum RoleEnum {
    CEO = "CEO",
    ADMIN = "ADMIN",
    TEACHER = "TEACHER",
    STUDENT = "STUDENT"
}
export declare class CreateUserDto {
    firstName: string;
    lastName: string;
    phone: string;
    password: string;
    role: RoleEnum;
    gender?: string;
    dateOfBirth?: string;
}
