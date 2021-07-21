import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpService,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { StocksService } from './stock.service';
import { WRK_PRICE_PATH } from './constants';
import { map } from 'rxjs/operators';

@Controller('api/stocks')
@ApiTags('stocks')
export class StocksController {
  constructor(
    private readonly stocksService: StocksService,
    private readonly httpService: HttpService
  ) { }
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get()
  getAll() {
    return this.stocksService.getAll();
  }

  @Get('/updateRates')
  async updateRates() {
    // const MOEXresp = this.httpService.get(WRK_PRICE_PATH)
    //   .pipe(map((res) => res.data.securities.data));
    const MOEXresp = (await this.httpService.get(WRK_PRICE_PATH).toPromise()).data.securities.data;
    return this.stocksService.updateFromExternalService(MOEXresp);
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
