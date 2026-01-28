import { useEffect, useState } from "react";
import { getAllTutors, degradeTutor } from "../services/adminUserApi";

export default function AdminTutors() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    getAllTutors(token)
      .then(data => {
        setTutors(data);
        setLoading(false);
      })
      .catch(err => {
        alert(err.message);
        setLoading(false);
      });
  }, [token]);

  const handleDegrade = async (id) => {
    if (!window.confirm("Downgrade tutor to normal user?")) return;

    try {
      await degradeTutor(id, token);
      setTutors(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-sattvaBrown mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-sattvaBrown/70 font-light">Loading tutors...</p>
        </div>
      </div>
    );
  }

  if (tutors.length === 0) {
    return (
      <div className="text-center py-20">
        <svg className="w-24 h-24 text-sattvaBrown/20 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0v6" />
        </svg>
        <h3 className="text-2xl font-serif text-sattvaDark mb-3">No Tutors Found</h3>
        <p className="text-sattvaBrown/60 font-light">
          There are currently no approved tutors on the platform.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <h2 className="text-3xl font-serif text-white mb-2">Approved Tutors</h2>
        <p className="text-sattvaBrown/70 font-light">
          Manage verified yoga instructors on the platform
        </p>
      </div>

      {/* Tutors List */}
      <div className="space-y-6">
        {tutors.map(t => (
          <div
            key={t._id}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-sattvaBeige/50 p-6 flex items-center justify-between"
          >
            <div>
              <p className="text-lg font-semibold text-sattvaDark">{t.name}</p>
              <p className="text-sm text-sattvaBrown/60">{t.email}</p>
            </div>

            <button
              onClick={() => handleDegrade(t._id)}
              className="px-5 py-2 bg-red-600 text-white rounded-xl font-medium
                         hover:bg-red-700 hover:shadow-lg hover:scale-105
                         transition-all duration-300"
            >
              Downgrade
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
