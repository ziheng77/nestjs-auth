import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "./auth.service";
import { readFileSync } from "fs";
import {join} from "path";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: readFileSync(join(__dirname,'keys','public.key'),'utf-8'),
            algorithms: ['RS256']
        });
    }
    async validate(payload: any){
        return this.authService.validateUser(payload.username, payload.id);
    }
}