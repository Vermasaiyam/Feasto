import { useNavigate } from "react-router-dom";

const UnderConstruction = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 text-center">
      <h1 className="text-3xl md:text-5xl font-bold mb-4">🚧 Under Construction 🚧</h1>
      <p className="text-base md:text-lg text-gray-600 max-w-md">
        This page is currently under construction. Please check back later!
      </p>
      <button
        onClick={() => navigate(-1)}
        className="mt-6 bg-green hover:bg-hoverGreen text-white font-semibold py-2 px-4 rounded-md"
      >
        Go Back
      </button>
    </div>
  );
};

export default UnderConstruction;
