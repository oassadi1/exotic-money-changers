export interface Currency {
  code: string;
  symbol: string;
  flag: string;
}

export interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
}
