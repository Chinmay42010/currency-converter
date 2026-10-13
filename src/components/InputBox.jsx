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
        <div
            className={`bg-white p-4 rounded-xl text-sm flex gap-3 border border-slate-200 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition ${className}`}
        >
            <div className="w-1/2">
                <label
                    htmlFor={amountId}
                    className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-1 inline-block"
                >
                    {label}
                </label>
                <input
                    id={amountId}
                    type="number"
                    className="outline-none w-full bg-transparent py-1 text-2xl font-semibold text-slate-900 placeholder:text-slate-300 placeholder:text-lg placeholder:font-normal disabled:text-slate-500"
                    placeholder="0.00"
                    disabled={amountDisabled}
                    value={amount}
                    onChange={(e) =>
                        onAmountChange && onAmountChange(e.target.value)
                    }
                />
            </div>

            <div className="w-1/2 flex flex-wrap justify-end text-right content-start">
                <label
                    htmlFor={currencyId}
                    className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-1 w-full"
                >
                    Currency
                </label>

                <select
                    id={currencyId}
                    className="rounded-lg px-2 py-2 bg-slate-100 hover:bg-slate-200 font-medium uppercase cursor-pointer outline-none focus:ring-2 focus:ring-blue-500 transition"
                    value={selectedCurrency}
                    onChange={(e) => {
                        onCurrencyChange && onCurrencyChange(e.target.value);
                    }}
                    disabled={currencyDisabled}
                >
                    {currencyOptions.map((currency) => (
                        <option key={currency} value={currency}>
                            {currency.toUpperCase()}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default InputBox;
