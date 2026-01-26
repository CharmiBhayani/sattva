import { useEffect, useState } from "react";
import { getUpcomingLiveClasses } from "../services/liveClassApi";
import { getMyBookings } from "../services/bookingApi";
import { createMockPayment, verifyMockPayment } from "../services/mockPaymentApi";
import MockCheckout from "../components/MockCheckout";
import { useNavigate } from "react-router-dom";

export default function LiveClasses() {
  const navigate = useNavigate(); // 

  const [classes, setClasses] = useState([]);
  const [bookedClassIds, setBookedClassIds] = useState([]);
  const [intentId, setIntentId] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    getUpcomingLiveClasses().then(setClasses);

    if (token) {
      getMyBookings(token).then(data => {
        const ids = data.map(b => b.liveClass._id);
        setBookedClassIds(ids);
      });
    }
  }, [token]);

  const handlePay = async (cls) => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (bookedClassIds.includes(cls._id)) {
      alert("⚠️ You have already booked this class");
      return;
    }

    const data = await createMockPayment(cls._id, token);
    setIntentId(data.intentId);
    setShowCheckout(true);
  };

  const handleSuccess = async () => {
    await verifyMockPayment(intentId, "success", token);
    alert("Booking confirmed 🎉");
    setShowCheckout(false);
  };

  const handleFail = async () => {
    await verifyMockPayment(intentId, "failed", token);
    alert("Payment failed ❌");
    setShowCheckout(false);
  };

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6">
        Upcoming Live Yoga Classes 🧘‍♀️
      </h2>

      {classes.map((cls) => (
        <div key={cls._id} className="p-5 bg-white rounded-xl shadow">
          <h3 className="text-xl font-semibold">{cls.title}</h3>
          <p>by {cls.tutor?.name}</p>
          <p>{new Date(cls.date).toLocaleString()}</p>
          <p>{cls.duration} minutes</p>
          <p>₹ {cls.price}</p>

          <button
            onClick={() => handlePay(cls)}
            disabled={bookedClassIds.includes(cls._id)}
            className={`mt-3 px-4 py-2 rounded text-white ${
              bookedClassIds.includes(cls._id)
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-calmBlue"
            }`}
          >
            {bookedClassIds.includes(cls._id)
              ? "Already Booked ✅"
              : "Pay & Book Class"}
          </button>
        </div>
      ))}

      {showCheckout && (
        <MockCheckout onSuccess={handleSuccess} onFail={handleFail} />
      )}
    </div>
  );
}
