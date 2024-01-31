export class CreateRoleDto {
    name: string;
    roles: Record<string, Record<string, string>>;
}
