import {Link} from "react-router-dom";
export default function Home() {
  return (
    <div className="flex flex-col items-center text-center mt-16">

      <h1 className="text-5xl md:text-6xl font-semibold text-calmNavy">
        Welcome to <span className="text-calmBlue">YogaVerse</span>
      </h1>

      <p className="text-lg md:text-xl text-calmNavy/70 mt-4 max-w-xl">
        Build mindful yoga sessions tailored for your energy, time of day, and goals.<br/>
        Relax, breathe & grow!
      </p>

      <div className="flex gap-6 mt-10">
        <Link
          to="/poses"
          className="px-6 py-3 rounded-xl bg-calmMint text-calmNavy font-medium shadow-sm 
                     hover:bg-calmBlue transition"
        >
          Explore Poses
        </Link>

        <Link  
          to="/create"
          className="px-6 py-3 rounded-xl bg-calmMint text-calmNavy font-medium shadow-sm 
                     hover:bg-calmBlue transition"
        >
          Create a Session
        </Link>
      </div>

    </div>
  );
}
