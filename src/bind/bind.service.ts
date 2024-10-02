import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import axios, { AxiosRequestConfig } from 'axios';
import { readFileSync } from 'fs';
import * as https from 'https';
import { AliasDto, DoRequestDto, DoRequestDtoDebin } from 'src/common/dto/bind.dto';
import { BindRequestInterface } from 'src/common/interfaces/bind.interface';
import { CoinsFiat, ConceptBind } from 'src/common/utils/enum';
import { EntityManager } from 'typeorm';

@Injectable()
export class BindService {
    private httpsAgent: https.Agent;
    private token: string;
    private timeTokenExpirate: Date;
    private URL = process.env.URL_BIND;
    private BANK_ID = process.env.BANK_ID_BIND;
    private ACCOUNT_ID = process.env.ACCOUNT_ID_BIND;
    private VIEW_ID = process.env.VIEW_ID_BIND;

    constructor(
        @InjectEntityManager('chronos')
        private readonly chronosEntityManager: EntityManager,
    ) { }

    async requestLogin() {
        try {
            const data = {
                username: process.env.USERNAME_BIND,
                password: process.env.PASSWORD_BIND,
            };

            console.log({ data });

            const config = {
                method: 'post',
                url: process.env.URL_BIND + '/login/jwt',
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
            console.log(error?.response);
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
    async doTransaction(body: DoRequestDto) {
        try {
            const { destinationCbu, amount } = body;

            // await this.getAccount(destinationCbu)

            const params: BindRequestInterface = {
                origin_id: String(body.idTransaction),
                origin_debit: {
                    cvu: process.env.CVU_DEBITO_BIND,
                },
                value: {
                    currency: CoinsFiat.ARS,
                    amount: Number(amount).toFixed(2),
                },
                to: {
                    cbu: destinationCbu,
                },
                concept: ConceptBind.VAR,
                description: 'Pago Alfred',
            };

            const headers = {
                Authorization: `JWT ${await this.getToken()}`,
            };

            const url: string = `${this.URL}/banks/${this.BANK_ID}/accounts/${this.ACCOUNT_ID}/${this.VIEW_ID}/transaction-request-types/TRANSFER-CVU/transaction-requests`;

            const config: AxiosRequestConfig = {
                method: 'POST',
                url,
                data: params,
                headers,
                httpsAgent: this.httpsAgent,
            };

            const response = await axios(config);

            console.log(response.data);
            console.log('body', body);

            return response.data;
        } catch (error) {
            console.log('body', body);
            console.log(error.response.data);
            throw new Error(error?.response?.data?.message);
        }
    }

    async doTransactionTest(body: DoRequestDto) {
        try {
            const { destinationCbu, amount } = body;

            if (Number(amount) < 10) {
                throw new Error('El monto debe ser inferior a 10 pesos');
            }

            const params: BindRequestInterface = {
                origin_id: String(body.idTransaction),
                origin_debit: {
                    cvu: process.env.CVU_DEBITO_BIND,
                },
                value: {
                    currency: CoinsFiat.ARS,
                    amount: Number(amount).toFixed(2),
                },
                to: {
                    cbu: destinationCbu,
                },
                concept: ConceptBind.VAR,
                description: 'Pago Alfred',
            };

            const headers = {
                Authorization: `JWT ${await this.getToken()}`,
            };

            const url: string = `${this.URL}/banks/${this.BANK_ID}/accounts/${this.ACCOUNT_ID}/${this.VIEW_ID}/transaction-request-types/TRANSFER-CVU/transaction-requests`;

            const config: AxiosRequestConfig = {
                method: 'POST',
                url,
                data: params,
                headers,
                httpsAgent: this.httpsAgent,
            };

            const response = await axios(config);

            console.log(response.data);
            console.log('body', body);

            return response.data;
        } catch (error) {
            console.log('body', body);
            console.log(error.response.data);
            throw new Error(error?.response?.data?.message);
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
                obp_origin: param.origin,
            };
            const response = await axios.get(
                `${this.URL}/banks/${this.BANK_ID}/accounts/${this.ACCOUNT_ID}/${this.VIEW_ID}/transaction-request-types/TRANSFER-CVU`,
                {
                    headers,
                    httpsAgent: this.httpsAgent,
                },
            );

            return response.data;
        } catch (error) {
            console.log('body', param);
            console.log(error?.response?.data);
            throw new Error(error?.response?.data?.message);
        }
    }

    async getTransactionByID(id: string) {
        try {
            const headers = {
                Authorization: `JWT ${await this.getToken()}`,
            };
            const response = await axios.get(
                `${this.URL}/banks/${this.BANK_ID}/accounts/${this.ACCOUNT_ID}/${this.VIEW_ID}/transaction-request-types/TRANSFER-CVU/${id}`,
                {
                    headers,
                    httpsAgent: this.httpsAgent,
                },
            );

            return response.data;
        } catch (error) {
            console.log(error?.response?.data);
            throw new Error(error?.response?.data?.message);
        }
    }

    async getAccount(cvu: string) {
        try {
            const headers = {
                Authorization: `JWT ${await this.getToken()}`,
            };
            const response = await axios.get(`${this.URL}/accounts/cbu/${cvu}`, {
                headers,
                httpsAgent: this.httpsAgent,
            });

            if (response.data.owners.length === 0)
                throw new Error('CVU invalida para operar.');

            return response.data;
        } catch (error) {
            console.log(error?.response?.data);
            throw new Error(error?.response?.data?.message);
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
            Authorization: `JWT ${await this.getToken()}`,
        };
        const url: string = `${this.URL}/accounts/alias/${body.alias}`;

        try {
            const config: AxiosRequestConfig = {
                method: 'GET',
                url,
                headers,
                httpsAgent: this.httpsAgent,
            };
            const response = await axios(config);
            const data = response.data;

            if (data.owners.length === 0)
                throw new Error('Alias invalido para operar.');

            return data;
        } catch (error) {
            console.log(error?.response?.data);
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
                Authorization: `JWT ${await this.getToken()}`,
            };
            const url = `${this.URL}/banks/${this.BANK_ID}/accounts/${this.VIEW_ID}`;
            const response = await axios.get(url, {
                headers,
                httpsAgent: this.httpsAgent,
            });
            const data = response.data;

            if (data.length === 0) throw new Error('Cuenta sin ningún balance.');
            return data.map((account: any) => {
                return {
                    alias: account.label,
                    balance: account.balance.amount,
                    cuit: account.owners[0].id,
                    cbu: account.account_routing.address,
                };
            });
        } catch (error) {
            console.log(error?.response?.data);
            throw new Error(error?.response?.data?.message);
        }
    }

    // DEBIN
    async doTransactionDebin(body: DoRequestDtoDebin) {
        try {
            const { originCbu, amount } = body;

            const params: BindRequestInterface = {
                origin_id: String(body.idTransaction),
                value: {
                    currency: CoinsFiat.ARS,
                    amount: Number(amount).toFixed(2),
                },
                to: {
                    cbu: originCbu,
                },
                concept: ConceptBind.VAR,
                expiration: 20,
            };

            const headers = {
                Authorization: `JWT ${await this.getToken()}`,
            };

            const url: string = `${this.URL}/banks/${this.BANK_ID}/accounts/${this.ACCOUNT_ID}/${this.VIEW_ID}/transaction-request-types/DEBIN/transaction-requests`;

            const config: AxiosRequestConfig = {
                method: 'POST',
                url,
                data: params,
                headers,
                httpsAgent: this.httpsAgent,
            };

            const response = await axios(config);

            console.log(response.data);
            console.log('body', body);

            return response.data;
        } catch (error) {
            console.log('body', body);
            console.log(error.response.data);
            throw error?.response?.data ?? 'Falla en el servicio bancario.';
        }
    }

    async getTransactionDebin(param: any) {
        try {
            const headers = {
                Authorization: `JWT ${await this.getToken()}`,
                obp_status: param.status,
                obp_limit: param.limit,
                obp_offset: param.offset,
                obp_from_date: param.from_date,
                obp_to_date: param.to_date,
            };
            const response = await axios.get(
                `${this.URL}/banks/${this.BANK_ID}/accounts/${this.ACCOUNT_ID}/${this.VIEW_ID}/transaction-request-types/DEBIN`,
                {
                    headers,
                    httpsAgent: this.httpsAgent,
                },
            );

            return response.data;
        } catch (error) {
            console.log({ payload: param, error: error?.response?.data });
            throw error?.response?.data ?? 'Falla en el servicio bancario.';
        }
    }

    async getTransactionByIdDebin(id: string) {
        try {
            const headers = {
                Authorization: `JWT ${await this.getToken()}`,
            };
            const response = await axios.get(
                `${this.URL}/banks/${this.BANK_ID}/accounts/${this.ACCOUNT_ID}/${this.VIEW_ID}/transaction-request-types/DEBIN/${id}`,
                {
                    headers,
                    httpsAgent: this.httpsAgent,
                },
            );

            return response.data;
        } catch (error) {
            console.log({ payload: id, error: error?.response?.data });
            throw error?.response?.data ?? 'Falla en el servicio bancario.';
        }
    }

    // Webhook
    async webhook(payload: any) {
        const headers = {
            Authorization: `JWT ${await this.getToken()}`,
            'Content-Type': 'application/json',
        };

        const url: string = `${this.URL}/webhooks`;

        const config: AxiosRequestConfig = {
            method: 'PUT',
            url,
            data: payload,
            headers,
            httpsAgent: this.httpsAgent,
            timeout: 300000,
        };

        try {
            const response = await axios(config);
            return response.data;
        } catch (error) {
            console.log('body', payload);
            console.log('config', config);
            console.log(error.response.data);
            throw error?.response?.data ?? 'Falla en el servicio bancario.';
        }
    }

    async getWebhook() {
        try {
            const headers = {
                Authorization: `JWT ${await this.getToken()}`,
                'Content-Type': 'application/json',
            };
            const response = await axios.get(`${this.URL}/webhooks`, {
                headers,
                httpsAgent: this.httpsAgent,
            });

            return response.data;
        } catch (error) {
            console.log(error?.response?.data);
            throw error?.response?.data ?? 'Falla en el servicio bancario.';
        }
    }

    async deleteWebhook(code: string) {
        try {
            const headers = {
                Authorization: `JWT ${await this.getToken()}`,
                'Content-Type': 'application/json',
            };
            const response = await axios.delete(`${this.URL}/webhooks/code/${code}`, {
                headers,
                httpsAgent: this.httpsAgent,
            });

            return response.data;
        } catch (error) {
            console.log(error?.response?.data);
            throw error?.response?.data ?? 'Falla en el servicio bancario.';
        }
    }

    async sendwebhook(payload: any) {
        console.log('webhook received', payload);
        const headers = {
            'Content-Type': `application/json`,
        };

        const url: string = `https://ramps-dev.alfredpay.io/v1/webhook/notification`;

        const config: AxiosRequestConfig = {
            method: 'POST',
            url,
            data: payload,
            headers,
        };

        try {
            const response = await axios(config);
            return true;
        } catch (error) {
            console.log('webhook received ERROR', payload);
            console.log(error.response.data);
            return true;
        }
    }

    async getTransactionBDaAlfred() {
        try {

            const fechas = await this.obtenerFechas();
            const query = `SELECT b.transaction_id,b.datetime,
            c.transaction_id_2,
            c.counterparty_account_address,c.counterparty_name,c.origin_debit_cvu,
            c.origin_debit_cuit,  b.transaction_type,
            c.transaction_status, c.transaction_amount
            FROM cvu_account_transactions a, transactions b,
            bind_cvu_accounts_transactions c where
            b.account_transaction_id=a.cvu_account_transaction_id
            and a.bind_transaction_id=c.id  and
            a.cvu_account_id in (293) and
            date_format(datetime, '%Y%m%d') between '${fechas.ayer}' and '${fechas.hoy}'
            and  b.transaction_type in ('receive') and c.transaction_amount < 2000000
            order by 2`;

            const result = await this.chronosEntityManager
                .query(query)
                .then((response) => response)
                .catch((error) => error);

            const headers = {
                'Content-Type': `application/json`,
            };

            const url: string = `https://circle-ramp.alfredpay.app/v1/webhook/deposit/argentina`;

            const config: AxiosRequestConfig = {
                method: 'POST',
                url,
                data: result,
                headers,
            };

            return await axios(config);
        } catch (error) {
            throw error
        }

    }

    async getTransactionBD() {
        try {

            const fechas = await this.obtenerFechas();
            const query = `SELECT b.transaction_id,b.datetime,
            c.transaction_id_2,
            c.counterparty_account_address,c.counterparty_name,c.origin_debit_cvu,
            c.origin_debit_cuit,  b.transaction_type,
            c.transaction_status, c.transaction_amount
            FROM cvu_account_transactions a, transactions b,
            bind_cvu_accounts_transactions c where
            b.account_transaction_id=a.cvu_account_transaction_id
            and a.bind_transaction_id=c.id  and
            a.cvu_account_id in (293) and
            date_format(datetime, '%Y%m%d') between '${fechas.ayer}' and '${fechas.hoy}'
            and  b.transaction_type in ('receive') and c.transaction_amount < 2000000
            order by 2`;

            const result = await this.chronosEntityManager
                .query(query)
                .then((response) => response)
                .catch((error) => error);

            return result

        } catch (error) {
            throw error
        }

    }

    async obtenerFechas() {
        // Obtener la fecha actual
        const fechaActual = new Date();

        // Restar un día
        const fechaRestada = new Date(fechaActual);
        fechaRestada.setDate(fechaRestada.getDate() - 1);

        // Formatear las fechas en el formato deseado y eliminar los ceros iniciales
        const fechaActualFormateada = fechaActual
            .toISOString()
            .slice(0, 10)
            .replace(/-/g, '');
        const fechaRestadaFormateada = fechaRestada
            .toISOString()
            .slice(0, 10)
            .replace(/-/g, '');

        // Retornar un objeto con ambas fechas
        return {
            hoy: fechaActualFormateada,
            ayer: fechaRestadaFormateada,
        };
    }
}
