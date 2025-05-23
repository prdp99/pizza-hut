export function formatAmountForDisplay(amount: number, currency: string): string {
    const numberFormat = new Intl.NumberFormat(["en-US"], {
        style: "currency",
        currency: currency,
        currencyDisplay: "symbol",
    });
    return numberFormat.format(amount);
}

export function formatAmountForStripe(amount: number, currency: string): number {
    const numberFormat = new Intl.NumberFormat(["en-US"], {
        style: "currency",
        currency: currency,
        currencyDisplay: "symbol",
    });

    const parts = numberFormat.formatToParts(amount);
    let zeroDecimalCurrency = true;

    for (const part of parts) { 
        if (part.type === "decimal") {
            zeroDecimalCurrency = false;
        }
    }

    return zeroDecimalCurrency ? amount : Math.round(amount * 100);
}

export function convertToSubcurrency(amount: number, factor = 100) {
    return Math.round(amount * factor);
}