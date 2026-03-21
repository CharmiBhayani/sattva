import { useEffect, useState } from "react";
import { getAllTutorWallets, processTutorPayout } from "../services/payoutApi.js";

export default function AdminPayouts() {
    const [wallets, setWallets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [processingId, setProcessingId] = useState(null);

    const token = localStorage.getItem("token");

    const fetchWallets = () => {
        setLoading(true);
        getAllTutorWallets(token)
            .then(setWallets)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchWallets();
    }, [token]);

    const handlePayout = async (tutorId, amount) => {
        if (!window.confirm(`Process payout of ₹${amount}?`)) return;
        setProcessingId(tutorId);
        try {
            await processTutorPayout(token, tutorId, amount);
            alert("Payout processed successfully!");
            fetchWallets(); // Refresh balances
        } catch (err) {
            alert(err.message);
        } finally {
            setProcessingId(null);
        }
    };

    if (loading) return <div className="p-8 text-center text-sattvaBrown">Loading wallets...</div>;
    if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-3xl font-serif text-white mb-2">Tutor Payouts</h2>
                <p className="text-sattvaBrown/70 font-light">Manage tutor wallet balances</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-sattvaBeige/50 overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-sattvaCream/50 border-b border-sattvaBeige/50">
                        <tr className="text-left text-sattvaDark">
                            <th className="p-4">Tutor Name</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Available Balance</th>
                            <th className="p-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {wallets.map((w) => (
                            <tr key={w._id} className="border-b border-sattvaBeige/30 hover:bg-sattvaCream/40 transition">
                                <td className="p-4">{w.tutor?.name || "Unknown"}</td>
                                <td className="p-4">{w.tutor?.email || "Unknown"}</td>
                                <td className="p-4 font-medium text-green-700">₹{w.balance}</td>
                                <td className="p-4">
                                    <button
                                        onClick={() => handlePayout(w.tutor._id, w.balance)}
                                        disabled={w.balance <= 0 || processingId === w.tutor._id}
                                        className={`px-4 py-2 rounded-lg text-white text-xs font-semibold
                      ${w.balance > 0 ? "bg-sattvaDark hover:bg-sattvaBrown" : "bg-gray-300 cursor-not-allowed"}
                    `}
                                    >
                                        {processingId === w.tutor._id ? "Processing..." : "Process Payout"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {wallets.length === 0 && (
                    <div className="text-center p-10 text-sattvaBrown/60">No tutor wallets found.</div>
                )}
            </div>
        </div>
    );
}
