import { createPayment, verifyPayment } from "../services/mockPaymentApi";

export default function MockCheckout({ classId, token, onClose }) {

  const handlePayment = async () => {
    try {


      //testt 
      console.log("TOKEN:", token);
      const orderData = await createPayment(classId, token);

      const options = {
        key: orderData.key,
        amount: orderData.amount * 100,
        currency: "INR",
        name: "Sattva Yoga",
        description: "Live Yoga Class",
        order_id: orderData.orderId,

        handler: async function (response) {

          await verifyPayment(
            {
              intentId: orderData.intentId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            },
            token
          );

          alert("Payment successful!");
          onClose();
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };


  return (
    <div className="fixed inset-0 bg-sattvaDark/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-sattvaBeige/50 max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-300">

        {/* Header */}
        <div className="bg-gradient-to-r from-sattvaBrown/5 to-sattvaBeige/10 p-6 border-b border-sattvaBeige/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-sattvaBrown/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-sattvaBrown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-serif text-sattvaDark">Secure Payment</h3>
              <p className="text-sm text-sattvaBrown/70 font-light">
                Pay securely to book your yoga class
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">

          <div className="mb-6 p-4 bg-sattvaCream/50 rounded-xl border border-sattvaBeige/50">
            <p className="text-sm text-sattvaBrown/80 leading-relaxed text-center">
              Click below to proceed to secure payment gateway.
            </p>
          </div>

          {/* Action Button */}
          <div className="space-y-3">

            <button
              onClick={handlePayment}
              className="w-full px-6 py-4 bg-green-600 text-white rounded-xl font-medium
              shadow-lg hover:bg-green-700 hover:shadow-xl hover:scale-105
              transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              Pay for Class
            </button>

            <button
              onClick={onClose}
              className="w-full px-6 py-4 bg-red-300 rounded-xl"
            >
              Cancel
            </button>

          </div>

          {/* Payment Methods */}
          <div className="mt-6 pt-6 border-t border-sattvaBeige/50">
            <p className="text-xs text-sattvaBrown/60 text-center mb-3 font-light">
              Accepted Payment Methods
            </p>

            <div className="flex items-center justify-center gap-3 opacity-40">
              <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">VISA</div>
              <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">MC</div>
              <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">UPI</div>
            </div>
          </div>

        </div>

        <div className="h-1 bg-gradient-to-r from-transparent via-sattvaBrown to-transparent"></div>
      </div>
    </div>
  );
}