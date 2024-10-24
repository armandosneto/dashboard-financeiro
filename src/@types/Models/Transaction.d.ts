namespace Models {
  interface Transaction {
    date: number;
    amount: string;
    transaction_type: string;
    currency: string;
    account: string;
    industry: string;
    state: string;
  }

  namespace Transaction {
    interface Filters {
      transaction_type?: string;
      currency?: string;
      account?: string;
      industry?: string;
      state?: string;
      minDate?: string;
      maxDate?: string;
      minAmount?: string;
      maxAmount?: string;
    }

    interface ApiData {
      total: number;
      accounts: string[];
      currencies: string[];
      industries: string[];
      states: string[];
      transactionTypes: string[];
      dates: number[];
      transactions: Transaction[];
    }
  }
}
