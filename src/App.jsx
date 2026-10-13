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
        <div
            className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
            style={{
                backgroundImage: `url(https://images.pexels.com/photos/39365021/pexels-photo-39365021.jpeg)`,
            }}
        >
            <div className="w-full">
                <div className="w-full max-w-md mx-auto border border-gray-50 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            convert();
                        }}
                    >
                        <div className="w-full mb-1">
                            <InputBox
                                label="from"
                                amount={amount}
                                currencyOptions={options}
                                onCurrencyChange={(currency) =>
                                    setFrom(currency)
                                }
                                onAmountChange={setAmount}
                                selectedCurrency={from}
                            />
                        </div>
                        <div className="relative w-full h-0.5">
                            <button
                                type="button"
                                onClick={swap}
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                            >
                                SWAP
                            </button>
                        </div>

                        <div className="w-full mb-1">
                            <InputBox
                                label="to"
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
                            <p className="text-red-700 text-sm mb-2">
                                Could not load rates: {error}
                            </p>
                        )}
                        <button
                            type="submit"
                            disabled={loading || rate == null}
                            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg disabled:opacity-50"
                        >
                            Convert {from.toUpperCase()} to {to.toUpperCase()}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App;
