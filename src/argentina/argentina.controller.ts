import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { BindService } from 'src/bind/bind.service';
import { DoRequestDto } from 'src/common/dto/bind.dto';
import { DefaultResponsesDto, ErrorResponseDto } from 'src/common/dto/response.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/JwtAutGuard.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('argentina')
export class ArgentinaController {
    constructor(
        private readonly bindService: BindService,
        private readonly authService: AuthService
    ) { }

    @Post('login')
    async getLogin(@Body() payload: LoginDto): Promise<DefaultResponsesDto | ErrorResponseDto> {
        try {
            return {
                statusCode: HttpStatus.ACCEPTED,
                message: 'Login',
                data: await this.authService.generateToken(payload)
            };
        } catch (error) {
            throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('send-transaction')
    async sendTransaction(@Body() payload: DoRequestDto): Promise<DefaultResponsesDto | ErrorResponseDto> {
        try {
            return {
                statusCode: HttpStatus.ACCEPTED,
                message: 'send Transaction',
                data: await this.bindService.doTransaction(payload)
            };
        } catch (error) {
            throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('get-transaction/:id')
    async getTransactionById(@Param('id') id: string): Promise<DefaultResponsesDto | ErrorResponseDto> {
        try {
            return {
                statusCode: HttpStatus.ACCEPTED,
                message: 'Get Transaction by Id',
                data: await this.bindService.getTransactionByID(id)
            };
        } catch (error) {
            throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('get-account-cvu/:cvu')
    async getAccount(@Param('cvu') cvu: string): Promise<DefaultResponsesDto | ErrorResponseDto> {
        try {
            return {
                statusCode: HttpStatus.ACCEPTED,
                message: 'Get Account by cvu',
                data: await this.bindService.getAccount(cvu)
            };
        } catch (error) {
            throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('get-account-alias/:alias')
    async getCustomerAlias(@Param('alias') alias: string) {
        try {
            return {
                statusCode: HttpStatus.ACCEPTED,
                message: 'get customer alias',
                data: await this.bindService.getCustomerAlias({ alias })
            };
        } catch (error) {
            throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
        }
    }
}
