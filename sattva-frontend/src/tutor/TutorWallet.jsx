import { useEffect, useState } from "react";
import { getTutorWallet, getTutorPayoutHistory } from "../services/payoutApi.js";

export default function TutorWallet() {
    const [wallet, setWallet] = useState(null);
    const [totalEarnings, setTotalEarnings] = useState(0);
    const [payouts, setPayouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");

    useEffect(() => {
        Promise.all([getTutorWallet(token), getTutorPayoutHistory(token)])
            .then(([walletData, historyData]) => {
                setWallet(walletData.wallet);
                setTotalEarnings(walletData.totalEarnings);
                setPayouts(historyData);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [token]);

    if (loading) return <div className="p-8 text-center text-sattvaBrown">Loading wallet details...</div>;
    if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-3xl font-serif text-white mb-2">My Wallet</h2>
                <p className="text-sattvaBrown/70 font-light">View your earnings and payouts</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/80 p-6 rounded-2xl shadow border border-sattvaBeige">
                    <h3 className="text-sm text-sattvaBrown mb-1">Available Balance</h3>
                    <p className="text-4xl font-semibold text-green-700">₹{wallet?.balance || 0}</p>
                </div>
                <div className="bg-white/80 p-6 rounded-2xl shadow border border-sattvaBeige">
                    <h3 className="text-sm text-sattvaBrown mb-1">Total Earnings</h3>
                    <p className="text-4xl font-semibold text-sattvaDark">₹{totalEarnings || 0}</p>
                </div>
            </div>

            <h3 className="text-xl font-serif text-white mb-4">Payout History</h3>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow border border-sattvaBeige/50 overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-sattvaCream/50 border-b border-sattvaBeige/50">
                        <tr className="text-left text-sattvaDark">
                            <th className="p-4">Date</th>
                            <th className="p-4">Amount</th>
                            <th className="p-4">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payouts.map((p) => (
                            <tr key={p._id} className="border-b border-sattvaBeige/30 hover:bg-sattvaCream/40 transition">
                                <td className="p-4 text-sattvaBrown/70">{new Date(p.createdAt).toLocaleDateString()}</td>
                                <td className="p-4 font-medium text-green-600">₹{p.amount}</td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${p.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {p.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {payouts.length === 0 && (
                    <div className="text-center p-10 text-sattvaBrown/60">No payout history yet.</div>
                )}
            </div>
        </div>
    );
}
