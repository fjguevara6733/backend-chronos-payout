import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import { AcceptQuoteDto, CreateOrderDto } from 'src/common/dto/b89.dto';

@Injectable()
export class B89Service {
  private secretKey = process.env.SECRET_KEY;
  private privateKey = process.env.CERT_PRIVATE_KEY;
  private publicKey = process.env.PUBLIC_KEY;
  private url = process.env.URL_B89;
  constructor() {}

  async signRequest(body= {}, queryString = {}) {
    const requestBody = {
      secretKey: this.secretKey,
      privateKey: this.privateKey,
      queryString,
      body
    };

    const data = await axios
      .post(`${this.url}/merchants/v1/sign`, requestBody)
      .then((response) => response.data)
      .catch((error) => console.log('error', error));

    return data;
  }
  async createOrder(body: CreateOrderDto) {
    const data = await this.signRequest(body);
    const headers = {
      'X-Request-Signature': data.signature,
      'X-Request-Timestamp': data.timestamp,
      'X-Request-publicKey': this.publicKey,
    };
    const requestOptions = {
      method: 'POST',
      headers,
      data: body,
      url: `${this.url}/remittance/orders/v1/quotes`,
    };

    try {
      const response = await axios(requestOptions);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log('error', error);
      return error;
    }
  }

  async acceptQuote(body: AcceptQuoteDto) {
    const data = await this.signRequest(body);
    const headers = {
      'X-Request-Signature': data.signature,
      'X-Request-Timestamp': data.timestamp,
      'X-Request-publicKey': this.publicKey,
    };
    const requestOptions = {
      method: 'POST',
      headers: headers,
      data: body,
      url: `${this.url}/remittance/orders/v1/quotes/accept`,
    };

    try {
      const response = await axios(requestOptions);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log('error', error);
      return error;
    }
  }

  async getQuotes() {
    const data = await this.signRequest();
    const headers = {
      'X-Request-Signature': data.signature,
      'X-Request-Timestamp': data.timestamp,
      'X-Request-publicKey': this.publicKey,
    };

    const requestOptions = {
      method: 'GET',
      headers: headers,
      url: `${this.url}/remittance/orders/v1/quotes`,
    };

    try {
      const response = await axios(requestOptions);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log('error', error);
      return error;
    }
  }

  async getQuotesByOrderId(id) {
    const data = await this.signRequest({}, {id});
    const headers = {
      'X-Request-Signature': data.signature,
      'X-Request-Timestamp': data.timestamp,
      'X-Request-publicKey': this.publicKey,
    };

    const requestOptions = {
      method: 'GET',
      headers: headers,
      url: `${this.url}/remittance/orders/v1/quotes/${id}`,
    };

    try {
      const response = await axios(requestOptions);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log('error', error);
      return error;
    }
  }

  async getExchange() {
    const data = await this.signRequest();
    const headers = {
      'X-Request-Signature': data.signature,
      'X-Request-Timestamp': data.timestamp,
      'X-Request-publicKey': this.publicKey,
    };
    const requestOptions: AxiosRequestConfig = {
      method: 'GET',
      url: `${this.url}/utils/v1/exchange/fx-rate`,
      headers: headers,
    };

    try {
      const response = await axios(requestOptions);
      return response.data;
    } catch (error) {
      console.log('Error:', error);
      throw new Error('Failed to get FX rate');
    }
  }
}
