import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import {
  CheckRequestDto,
  GetCpfInfoDto,
  MakePaymentDto,
  PaymentUpdateRequestDto,
} from 'src/common/dto/starspay.dto';

@Injectable()
export class StarspayService {
  constructor() {}
  /**
   * @method getAccountBalances
   * Servicio para obtener el balance de las cuentas
   * @returns
   */
  async getAccountBalances() {
    const url: string = 'https://sandbox.starspay.net/v1/balance';
    const headers: { [key: string]: string } = {
      Authorization:
        'Basic MWUxZC1jNDhmLTRiZTYtYWNiMi1mMmNmOjBhOGFjZjk5ZmI4YjNjZTQ5YmEyYzEzZDZiYzgwYWNhMzliZjM5YjgyZTYwMDNmY2RkN2JkMDIxNDg4NTY3NTA=',
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
    const url = 'https://sandbox.starspay.net/v1/payment';
    const headers = {
      Authorization:
        'Basic MWUxZC1jNDhmLTRiZTYtYWNiMi1mMmNmOjBhOGFjZjk5ZmI4YjNjZTQ5YmEyYzEzZDZiYzgwYWNhMzliZjM5YjgyZTYwMDNmY2RkN2JkMDIxNDg4NTY3NTA=',
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
    const url = 'https://sandbox.starspay.net/v1/cpf';
    const headers = {
      Authorization:
        'Basic MWUxZC1jNDhmLTRiZTYtYWNiMi1mMmNmOjBhOGFjZjk5ZmI4YjNjZTQ5YmEyYzEzZDZiYzgwYWNhMzliZjM5YjgyZTYwMDNmY2RkN2JkMDIxNDg4NTY3NTA=',
      'Content-Type': 'application/json',
      Cookie: 'PHPSESSID=qlvku905vc508mkt7468mos1g8',
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
   * @method performCheck
   * Servicio para realizar un check
   * @param body
   * @returns
   */
  async performCheck(body: CheckRequestDto) {
    const url = 'https://sandbox.starspay.net/v1/check';
    const headers = {
      Authorization:
        'Basic MWUxZC1jNDhmLTRiZTYtYWNiMi1mMmNmOjBhOGFjZjk5ZmI4YjNjZTQ5YmEyYzEzZDZiYzgwYWNhMzliZjM5YjgyZTYwMDNmY2RkN2JkMDIxNDg4NTY3NTA=',
      'Content-Type': 'application/json',
      Cookie: 'PHPSESSID=oi5fv05rlt8tra7rllgb9hb0qf',
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
   * @method updatePayment
   * Servicio para actualizar un pago
   * @param body
   * @returns
   */
  async updatePayment(body: PaymentUpdateRequestDto) {
    const url = 'https://sandbox.starspay.net/v1/payment/update';
    const headers = {
      Authorization:
        'Basic MWUxZC1jNDhmLTRiZTYtYWNiMi1mMmNmOjBhOGFjZjk5ZmI4YjNjZTQ5YmEyYzEzZDZiYzgwYWNhMzliZjM5YjgyZTYwMDNmY2RkN2JkMDIxNDg4NTY3NTA=',
      'Content-Type': 'application/json',
      Cookie: 'PHPSESSID=n1qg9jgdo9m1nitcl8rcnqj929',
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
    const url = `https://sandbox.starspay.net/v1/transaction?id=${id}`;
    const headers = {
      Authorization:
        'Basic MWUxZC1jNDhmLTRiZTYtYWNiMi1mMmNmOjBhOGFjZjk5ZmI4YjNjZTQ5YmEyYzEzZDZiYzgwYWNhMzliZjM5YjgyZTYwMDNmY2RkN2JkMDIxNDg4NTY3NTA=',
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
