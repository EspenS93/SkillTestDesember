import { BusinessRelation } from './business-relation';

export class Contact {
    ID: number;
    Role: string;
    Comment: string;
    Info: BusinessRelation = new BusinessRelation();
}
