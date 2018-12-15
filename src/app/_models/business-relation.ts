import { Phone } from './phone';
import { Email } from './email';
import { Address } from './address';

export class BusinessRelation {
    ID: number;
    Name: string;
    InvoiceAddress: Address = new Address();
    DefaultPhone: Phone = new Phone();
    DefaultEmail: Email = new Email();
}
