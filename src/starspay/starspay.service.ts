import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import {
  PrizepoolRequestDto,
  GetCpfInfoDto,
  MakePaymentDto,
  PaymentUpdateRequestDto,
} from 'src/common/dto/starspay.dto';

@Injectable()
export class StarspayService {
  private ambiente = 'dev';
  private URL =
    this.ambiente === 'dev'
      ? process.env.URL_STARSPAY_DEV
      : process.env.URL_STARSPAY_PROD;
  private Authorization =
    this.ambiente === 'dev'
      ? process.env.AUTHORIZATION_STARSPAY_DEV
      : process.env.AUTHORIZATION_STARSPAY_PROD;
  constructor() {}
  /**
   * @method getAccountBalances
   * Servicio para obtener el balance de las cuentas
   * @returns
   */
  async getAccountBalances() {
    const url: string = `${this.URL}/balance`;
    const headers: { [key: string]: string } = {
      Authorization: `Basic ${this.Authorization}`,
      'Content-Type': 'application/json',
    };

    const config: AxiosRequestConfig = {
      url,
      method: 'GET',
      headers,
    };

    try {
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      console.log(error?.response?.data);
      throw new Error(error?.response?.data?.message);
    }
  }

  /**
   * @method makePayment
   * Servicio para realizar un pago
   * @param body
   * @returns
   */
  async makePayment(body: MakePaymentDto) {
    const url = `${this.URL}/payment`;
    const headers = {
      Authorization: `Basic ${this.Authorization}`,
      'Content-Type': 'application/json',
    };

    const config: AxiosRequestConfig = {
      url,
      method: 'POST',
      headers,
      data: body,
    };

    try {
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      // Manejo de errores
      throw error;
    }
  }

  /**
   * @method getCpfInfo
   * Servicio para obtener informacion de un Cpf
   * @param body
   * @returns
   */
  async getCpfInfo(body: GetCpfInfoDto) {
    const url = `${this.URL}/cpf`;
    const headers = {
      Authorization: `Basic ${this.Authorization}`,
      'Content-Type': 'application/json',
    };

    const config: AxiosRequestConfig = {
      url,
      method: 'POST',
      headers,
      data: body,
    };

    try {
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      // Manejo de errores
      throw error;
    }
  }

  /**
   * @method prizepoolRequest
   * Servicio para realizar un check
   * @param body
   * @returns
   */
  async prizepoolRequest(body: PrizepoolRequestDto) {
    const url = `${this.URL}/prizepool`;
    const headers = {
      Authorization: `Basic ${this.Authorization}`,
      'Content-Type': 'application/json',
    };

    const config: AxiosRequestConfig = {
      url,
      method: 'POST',
      headers,
      data: body,
    };

    try {
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      // Manejo de errores
      throw error;
    }
  }

  /**
   * @method updateTransaction
   * Servicio para actualizar un pago
   * @param body
   * @returns
   */
  async updateTransaction(body: PaymentUpdateRequestDto, isPayment: boolean = true) {
    const url = isPayment ? `${this.URL}/payment/update` : `${this.URL}/prizepool/update`;
    const headers = {
      Authorization: `Basic ${this.Authorization}`,
      'Content-Type': 'application/json',
    };

    const config: AxiosRequestConfig = {
      url,
      method: 'PUT',
      headers,
      data: body,
    };

    try {
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      // Manejo de errores
      throw error;
    }
  }

  async getTransaction(id: string) {
    const url = `${this.URL}/transaction?id=${id}`;
    const headers = {
      Authorization: `Basic ${this.Authorization}`,
      'Content-Type': 'application/json',
    };

    const config: AxiosRequestConfig = {
      url,
      method: 'GET',
      headers,
    };

    try {
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      // Manejo de errores
      throw error;
    }
  }
}
