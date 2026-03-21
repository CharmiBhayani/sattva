import { useEffect, useState } from "react";
import { getAllPayments } from "../services/adminAnalyticsApi.js";

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    getAllPayments(token)
      .then(setPayments)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center py-20 text-sattvaBrown">
        Loading payments...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 p-6 rounded-xl text-center">
        {error}
      </div>
    );
  }

  return (
    <div>

      {/* Page Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-serif text-white mb-2">
          Payment History
        </h2>
        <p className="text-sattvaBrown/70 font-light">
          View all platform transactions
        </p>
      </div>


      {/* Payments Table */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-sattvaBeige/50 overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-sattvaCream/50 border-b border-sattvaBeige/50">
            <tr className="text-left text-sattvaDark">
              <th className="p-4">User</th>
              <th className="p-4">Tutor</th>
              <th className="p-4">Class</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Platform Fee</th>
              <th className="p-4">Tutor Earning</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>

          <tbody>

            {payments.map((p) => (
              <tr
                key={p._id}
                className="border-b border-sattvaBeige/30 hover:bg-sattvaCream/40 transition"
              >

                <td className="p-4">
                  {p.user?.name || "Unknown"}
                </td>

                <td className="p-4">
                  {p.tutor?.name || "Unknown"}
                </td>

                <td className="p-4">
                  {p.liveClass?.title || "-"}
                </td>

                <td className="p-4 font-medium">
                  ₹{p.amount}
                </td>

                <td className="p-4 text-amber-600">
                  ₹{p.platformFee || 0}
                </td>

                <td className="p-4 text-green-600">
                  ₹{p.tutorEarning || 0}
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
                    ${
                      p.status === "success"
                        ? "bg-green-100 text-green-700"
                        : p.status === "failed"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {p.status}
                  </span>

                </td>

                <td className="p-4 text-sattvaBrown/70">
                  {new Date(p.createdAt).toLocaleDateString()}
                </td>

              </tr>
            ))}

          </tbody>
        </table>

        {payments.length === 0 && (
          <div className="text-center p-10 text-sattvaBrown/60">
            No payments found
          </div>
        )}

      </div>
    </div>
  );
}