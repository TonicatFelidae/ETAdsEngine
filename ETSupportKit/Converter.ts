export class Converter {
    static convertToMoneyFormat(value: number | string): string {
        const raw = String(value ?? '').trim();

        if (raw.length === 0) {
            return '0';
        }

        const isNegative = raw.startsWith('-');
        const unsigned = isNegative ? raw.slice(1) : raw;
        const [integerPartRaw, decimalPart] = unsigned.split('.');

        const integerPart = integerPartRaw.replace(/[^0-9]/g, '');

        if (integerPart.length === 0) {
            return '0';
        }

        const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        const withSign = isNegative ? `-${formattedInteger}` : formattedInteger;

        return decimalPart !== undefined && decimalPart.length > 0
            ? `${withSign}.${decimalPart.replace(/[^0-9]/g, '')}`
            : withSign;
    }
}

