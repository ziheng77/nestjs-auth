import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userServer:UserService,
        private readonly jwtServer: JwtService,
    ){}
    async validateUser(username:string, password:string): Promise<User | null> {
        return this.userServer.validateUser(username,password);
    }
    async login(user:User){
        const payload = {username: user.username, id: user.id};
        return{
            access_token: this.jwtServer.sign(payload),
        }
    }
}
