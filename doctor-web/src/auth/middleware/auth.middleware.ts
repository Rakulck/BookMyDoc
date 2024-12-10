import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { FirebaseService } from '../../firebase/firebase.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly firebaseService: FirebaseService) {}

  /**
   * MIDDLEWARE FOR AUTHENTICATE WITH TOKEN FOR USER AND PRIVATE ROUTES
   * @param req
   * @param res
   * @param next
   */
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split('Bearer ')[1];

    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    try {
      const decodedToken = await this.firebaseService
        .getAuth()
        .verifyIdToken(token);

      req['user'] = decodedToken;
      next();
    } catch (error) {
      next(new UnauthorizedException('Invalid token'));
    }
  }
}
