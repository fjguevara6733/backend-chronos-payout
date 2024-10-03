export interface BindRequestInterface {
  to?: {
    cbu: string;
  };
  value?: {
    currency: string;
    amount: string;
  };
  concept?: string;
  description?: string
  origin_id?: string;
  origin_debit?: {
    cvu: string;
  },
  expiration?:number;
}

export interface TransactionDataInterface {
  transaction_id: number;
  datetime: string;
  transaction_id_2: string;
  counterparty_account_address: string;
  counterparty_name: string;
  origin_debit_cvu: string;
  origin_debit_cuit: string;
  transaction_type: string;
  transaction_status: string;
  transaction_amount: number;
}