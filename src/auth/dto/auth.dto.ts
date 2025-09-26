import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from 'src/users/dto/user.dto';

export class SignUpDto extends CreateUserDto {}

export class SignInDto extends OmitType(SignUpDto, ['name']) {}
