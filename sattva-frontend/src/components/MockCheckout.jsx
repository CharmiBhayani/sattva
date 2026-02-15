export default function MockCheckout({ onSuccess, onFail }) {
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
              <h3 className="text-2xl font-serif text-sattvaDark">Payment Simulation</h3>
              <p className="text-sm text-sattvaBrown/70 font-light">Test mode - No real payment will be processed</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6 p-4 bg-sattvaCream/50 rounded-xl border border-sattvaBeige/50">
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-sattvaBrown/60 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-sattvaBrown/80 leading-relaxed">
                This is a demo payment gateway. Click one of the buttons below to simulate a payment outcome.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={onSuccess}
              className="w-full px-6 py-4 bg-green-600 text-white rounded-xl font-medium
                       shadow-lg hover:bg-green-700 hover:shadow-xl hover:scale-105 
                       transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Simulate Successful Payment
            </button>

            <button
              onClick={onFail}
              className="w-full px-6 py-4 bg-red-600 text-white rounded-xl font-medium
                       shadow-lg hover:bg-red-700 hover:shadow-xl hover:scale-105 
                       transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Simulate Failed Payment
            </button>
          </div>

          {/* Payment Methods Display (for visual flair) */}
          <div className="mt-6 pt-6 border-t border-sattvaBeige/50">
            <p className="text-xs text-sattvaBrown/60 text-center mb-3 font-light">Accepted Payment Methods</p>
            <div className="flex items-center justify-center gap-3 opacity-40">
              <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">VISA</div>
              <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">MC</div>
              <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">UPI</div>
              <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center text-xs">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="h-1 bg-gradient-to-r from-transparent via-sattvaBrown to-transparent"></div>
      </div>
    </div>
  );
}