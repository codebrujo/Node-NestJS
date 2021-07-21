import { HttpService } from '@nestjs/common';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AxiosRequestInterceptor implements NestInterceptor {
  constructor(private readonly httpService: HttpService) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle();
  }
}
