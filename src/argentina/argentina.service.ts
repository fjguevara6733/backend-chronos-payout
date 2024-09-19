import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import { readFileSync } from 'fs';
import { AliasDto, DoRequestDto } from 'src/common/dto/bind.dto';
import { BindRequestInterface } from 'src/common/interfaces/bind.interface';
import { CoinsFiat, ConceptBind } from 'src/common/utils/enum';
import * as https from 'https';

@Injectable()
export class ArgentinaService {
    private httpsAgent: https.Agent;
    private token: string;
    private timeTokenExpirate: Date;
    private URL = 'https://sandbox.bind.com.ar/v1';
    private BANK_ID = '322';
    private ACCOUNT_ID = '21-1-99999-4-6';
    private VIEW_ID = 'OWNER';

    constructor() { }

    async requestLogin() {
        try {
            const data = {
                username: 'matiasplano@gmail.com',
                password: '2SoeIRGTVP5fGbV',
            };

            console.log({ data })

            const config = {
                method: 'post',
                url: 'https://sandbox.bind.com.ar/v1/login/jwt',
                data,
            };

            if (process.env.CLIENT_CERTIFICATE && process.env.CLIENT_KEY) {
                this.httpsAgent = new https.Agent({
                    cert: readFileSync(process.env.CLIENT_CERTIFICATE),
                    key: readFileSync(process.env.CLIENT_KEY),
                });

                config['httpsAgent'] = this.httpsAgent;
            }
            const response = await axios(config);

            const timeExpire = new Date(
                new Date().getTime() + response.data.expires_in * 1000,
            );

            this.timeTokenExpirate = timeExpire;

            this.token = response.data.token;

            return response.data.token;
        } catch (error) {
            console.log(error?.response)
            throw new Error(error?.response?.data?.message);
        }
    }

    async checkTokenAndReconnect(expirationDate: Date) {
        const currentTime = new Date().getTime();
        const expirationTime = expirationDate.getTime();
        const oneMinuteInMillis = 60 * 1000;

        if (expirationTime - currentTime <= oneMinuteInMillis) {
            await this.requestLogin();
        }
    }

    async getToken() {
        if (!this.token) {
            return await this.requestLogin();
        }
        await this.checkTokenAndReconnect(this.timeTokenExpirate);
        return this.token;
    }
    /**
     * Executes a transaction to the specified destination using the specified parameters.
     *
     * @param destinationCbu - The CBU of the destination account.
     * @param amount - The amount of the transaction.
     * @param concept - The description of the transaction.
     * @param origin_id - The ID of the origin account.
     * @param origin_debit_cvu - The CVU of the origin debit card.
     * @returns A promise that resolves to the response from the BIND API.
     */

    async doTransactionTest(body: DoRequestDto) {
        try {
            const { destinationCbu, amount } = body;

            if (Number(amount) > 10) {
                throw new Error('El monto debe ser inferior a 10 pesos')
            }

            const params: BindRequestInterface = {
                origin_id: String(body.idTransaction),
                origin_debit: {
                    cvu: '0000058100000000034531',
                },
                value: {
                    currency: CoinsFiat.ARS,
                    amount: Number(amount).toFixed(2),
                },
                to: {
                    cbu: destinationCbu,
                },
                concept: ConceptBind.VAR,
                description: "Pago Alfred",
            };

            const headers = {
                Authorization: `JWT ${await this.getToken()}`
            }

            const url: string = `${this.URL}/banks/${this.BANK_ID}/accounts/${this.ACCOUNT_ID}/${this.VIEW_ID}/transaction-request-types/TRANSFER-CVU/transaction-requests`;

            const config: AxiosRequestConfig = {
                method: 'POST',
                url,
                data: params,
                headers,
                httpsAgent: this.httpsAgent
            };

            const response = await axios(config);
            return response.data;
        } catch (error) {
            throw new Error(error?.response?.data?.message ?? error?.message);
        }
    }

    async getTransaction(param: any) {
        try {
            const headers = {
                Authorization: `JWT ${await this.getToken()}`,
                obp_status: param.status,
                obp_limit: param.limit,
                obp_offset: param.offset,
                obp_from_date: param.from_date,
                obp_to_date: param.to_date,
                obp_origin: param.origin
            }
            const response = await axios.get(`${this.URL}/banks/${this.BANK_ID}/accounts/${this.ACCOUNT_ID}/${this.VIEW_ID}/transaction-request-types/TRANSFER-CVU`, {
                headers,
                httpsAgent: this.httpsAgent
            })

            return response.data
        } catch (error) {
            throw new Error(error?.response?.data?.message)
        }
    }

    async getTransactionByID(id: string) {
        try {
            const headers = {
                Authorization: `JWT ${await this.getToken()}`
            }
            const response = await axios.get(`${this.URL}/banks/${this.BANK_ID}/accounts/${this.ACCOUNT_ID}/${this.VIEW_ID}/transaction-request-types/TRANSFER-CVU/${id}`, {
                headers,
                httpsAgent: this.httpsAgent
            })

            return response.data
        } catch (error) {
            throw new Error(error?.response?.data?.message)
        }
    }

    async getAccount(cvu: string) {
        try {
            const headers = {
                Authorization: `JWT ${await this.getToken()}`
            }
            const response = await axios.get(`${this.URL}/accounts/cbu/${cvu}`, {
                headers,
                httpsAgent: this.httpsAgent
            })

            if (response.data.owners.length === 0) throw new Error('CVU invalida para operar.')

            return response.data
        } catch (error) {
            throw new Error(error?.response?.data?.message)
        }
    }
    /**
     * @method getCustomerAlias
     * Servicio para obtener el CUIT de un cliente a traves del alias
     * @param alias 
     * @returns 
     */
    async getCustomerAlias(body: AliasDto) {
        const headers = {
            Authorization: `JWT ${await this.getToken()}`
        }
        const url: string = `${this.URL}/accounts/alias/${body.alias}`;

        try {
            const config: AxiosRequestConfig = {
                method: 'GET',
                url,
                headers,
                httpsAgent: this.httpsAgent
            };
            const response = await axios(config);
            const data = response.data;

            if (data.owners.length === 0) throw new Error('Alias invalido para operar.');

            return data;
        } catch (error) {
            throw new Error('Error al obtener alias.');
        }
    }

    /**
     * @method getAccountBalances
     * Servicio para obtener el balance de las cuentas
     * @returns 
     */
    async getAccountBalances() {
        try {
            const headers = {
                Authorization: `JWT ${await this.getToken()}`
            }
            const url = `${this.URL}/banks/${this.BANK_ID}/accounts/${this.VIEW_ID}`;
            const response = await axios.get(url, {
                headers,
                httpsAgent: this.httpsAgent
            });
            const data = response.data;

            if (data.length === 0) throw new Error('Cuenta sin ningún balance.');
            return data.map((account: any) => {
                return {
                    alias: account.label,
                    balance: account.balance.amount,
                    cuit: account.owners[0].id,
                    cbu: account.account_routing.address
                }
            })
        } catch (error) {
            throw new Error(error?.response?.data?.message)
        }
    }
}
