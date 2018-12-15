export class Phone {
    ID: number;
    Number: number;
    Description: string;
    Type: PhoneType;
    CountryCode: string;
}

enum PhoneType {
    Phone = 150101,
    Mobile = 150102,
    Fax = 15010
}
