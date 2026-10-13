import { useId } from "react";

function InputBox({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions = [],
    selectedCurrency = "usd",
    amountDisabled = false,
    currencyDisabled = false,
    className = "",
}) {
    const amountId = useId();
    const currencyId = useId();

    return (
        <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
            <div className="w-1/2">
                <label htmlFor={amountId} className="text-black/40 mb-2 inline-block">
                    {label}
                </label>
                <input
                    id={amountId}
                    type="number"
                    className="outline-none w-full bg-transparent py-1.5"
                    placeholder="Amount"
                    disabled={amountDisabled}
                    value={amount}
                    onChange={(e) =>
                        onAmountChange && onAmountChange(e.target.value)
                    }
                />
            </div>

            <div className="w-1/2 flex flex-wrap justify-end text-right">
                <label htmlFor={currencyId} className="text-black/40 mb-2 w-full">
                    Currency Type
                </label>

                <select
                    id={currencyId}
                    className="rounded-md px-2 py-2 bg-gray-200 cursor-pointer outline-none"
                    value={selectedCurrency}
                    onChange={(e) => {
                        onCurrencyChange && onCurrencyChange(e.target.value);
                    }}
                    disabled={currencyDisabled}
                >
                    {currencyOptions.map((currency) => (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default InputBox;
