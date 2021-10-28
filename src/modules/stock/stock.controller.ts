import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { StocksService } from './stock.service';

@Controller('api/stocks')
@ApiTags('stocks')
export class StocksController {
  constructor(
    private readonly stocksService: StocksService,
  ) { }
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get()
  getAll() {
    return this.stocksService.getAll();
  }

  @Get('/updateRates')
  async updateRates() {
    return this.stocksService.updateFromExternalService();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.stocksService.getById(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createStockDto: CreateStockDto) {
    return this.stocksService.create(createStockDto);
  }
  
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stocksService.delete(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Put(':id')
  update(@Body() updateStockDto: UpdateStockDto, @Param('id') id: string) {
    return this.stocksService.update(updateStockDto, id);
  }
}
