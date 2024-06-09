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
      Cookie: 'PHPSESSID=tvvq79a8161so6qqkqd7pcn9se',
    };

    body = {
      partner_user_uid: 123456,
      partner_user_name: 'Philip William',
      partner_user_email: 'philip@email.com',
      partner_user_document: '42345678981',
      partner_user_birthday: '1990-01-01',
      partner_user_mobile: '11998589706',
      partner_order_number: 'ABC123456',
      partner_order_amount: 2.0,
      partner_order_group: 1,
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
    body = {
      partner_user_uid: '123456',
      partner_user_document: '42345678981',
      partner_order_number: 'ABC123456',
      partner_order_amount: '2.00',
      order_token: 'ce68-4e9f-400a-8099-f108',
      order_operation_id: 4,
      order_status_id: 7,
      order_created_at: '2024-02-22 18:17:15',
      order_valid_at: '2024-02-22 21:17:15',
      order_updated_at: '2024-02-22 19:03:41',
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
      Cookie: 'PHPSESSID=tvvq79a8161so6qqkqd7pcn9se',
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
