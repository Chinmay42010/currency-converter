import { useState } from "react";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import { InputBox } from "./components/index.js";

function App() {
    const [amount, setAmount] = useState("");
    const [from, setFrom] = useState("usd");
    const [to, setTo] = useState("inr");
    const [converted, setConverted] = useState("");

    const { data: currencyInfo, loading, error } = useCurrencyInfo(from);
    const options = Object.keys(currencyInfo);
    const rate = currencyInfo[to];

    const swap = () => {
        setFrom(to);
        setTo(from);
        setConverted(amount);
        setAmount(converted);
    };

    const convert = () => {
        if (rate == null) return;
        setConverted(String((parseFloat(amount) || 0) * rate));
    };

    return (
        <div className="w-full min-h-screen flex justify-center items-center px-4 py-10 bg-slate-950 bg-cover bg-no-repeat bg-center relative">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(https://images.pexels.com/photos/39365021/pexels-photo-39365021.jpeg)`,
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/60 to-slate-950/80" />

            <div className="w-full max-w-md mx-auto rounded-2xl p-6 shadow-2xl backdrop-blur-xl bg-white/85 border border-white/40 relative">
                <h1 className="text-2xl font-bold text-slate-900">
                    Currency Converter
                </h1>
                <p className="text-sm text-slate-600 mt-1 mb-4 h-5">
                    {loading ? (
                        <span className="inline-block w-40 h-4 rounded bg-slate-200 animate-pulse align-middle" />
                    ) : rate != null ? (
                        <>
                            1 {from.toUpperCase()} = {rate}{" "}
                            {to.toUpperCase()}
                        </>
                    ) : (
                        "Rates unavailable"
                    )}
                </p>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        convert();
                    }}
                >
                    <div className="w-full mb-2">
                        <InputBox
                            label="From"
                            amount={amount}
                            currencyOptions={options}
                            onCurrencyChange={(currency) =>
                                setFrom(currency)
                            }
                            onAmountChange={setAmount}
                            selectedCurrency={from}
                        />
                    </div>
                    <div className="relative w-full h-6">
                        <button
                            type="button"
                            onClick={swap}
                            title="Swap currencies"
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-lg leading-none w-10 h-10 shadow-lg border-4 border-white transition"
                        >
                            ⇄
                        </button>
                    </div>

                    <div className="w-full mt-2 mb-4">
                        <InputBox
                            label="To"
                            amount={converted}
                            currencyOptions={options}
                            onCurrencyChange={(currency) =>
                                setTo(currency)
                            }
                            amountDisabled
                            selectedCurrency={to}
                        />
                    </div>
                    {error && (
                        <p className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-3 py-2 mb-3">
                            Could not load rates: {error}
                        </p>
                    )}
                    <button
                        type="submit"
                        disabled={loading || rate == null}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 font-semibold text-white px-4 py-3 rounded-xl shadow-md disabled:opacity-50 disabled:hover:from-blue-600 disabled:hover:to-indigo-600 transition"
                    >
                        Convert {from.toUpperCase()} to{" "}
                        {to.toUpperCase()}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default App;
