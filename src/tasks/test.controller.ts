import { Controller, Get } from '@nestjs/common';
import { getManager } from 'typeorm';
import { Tasklist } from './tasklist.entity';

@Controller('test')
export class TestController {

  @Get()
  async test(): Promise<Tasklist[]> {
    const query = `
      SELECT id, name, description
      FROM public.tasklist;
      `
    const result = await getManager().query(query);
    return result;
  }

}
