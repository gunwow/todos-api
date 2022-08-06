import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { DocumentService } from './document.service';
import { Document } from './document.model';
import { DocumentDTO } from './dto/document.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ReqUser } from '../auth/decorator/req-user.decorator';
import { User } from '../user/user.model';
import { PaginatedSet } from '../common/crud';

@UseGuards(AuthGuard)
@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get('all')
  async findAll(@ReqUser() user: User): Promise<PaginatedSet<Document[]>> {
    return this.documentService.findByUserId(user.id);
  }

  @Post()
  async create(
    @ReqUser() user: User,
    @Body() payload: DocumentDTO,
  ): Promise<Document> {
    return this.documentService.create({
      ...payload,
      userId: user.id,
    });
  }
}
