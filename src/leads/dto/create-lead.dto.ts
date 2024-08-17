import { ApiProperty } from "@nestjs/swagger"

export class CreateLeadDto {
    @ApiProperty()
    name: String

    @ApiProperty()
    email: String

    @ApiProperty()
    phone: String

    @ApiProperty()
    products: String[]
}
