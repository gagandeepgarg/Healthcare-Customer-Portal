export class RegexConstants {
    static readonly EmailId = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    static readonly PhoneNumber = /[^0-9]/g;
    static readonly Zipcode = /^\d{5}(?:-\d{4})?$/;
    static readonly SpecialChars = /^[A-Za-z0-9/-]+$/;
}
