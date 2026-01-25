export default function MockCheckout({ onSuccess, onFail }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Mock Payment</h3>

        <button
          className="bg-green-500 text-white px-4 py-2 rounded mr-3"
          onClick={onSuccess}
        >
          Simulate Success
        </button>

        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={onFail}
        >
          Simulate Failure
        </button>
      </div>
    </div>
  );
}
