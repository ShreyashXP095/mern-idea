import { BookOpen } from "lucide-react";
import { useNavigate } from "react-router";

export default function NoteNotFound() {
    const navigate = useNavigate();
    const handleRoute = () =>{
        navigate("/create");
    }
  return (
    <div className="flex flex-col item-center justify-center py-16 spacy-y-6 max-w-md mx-auto text-center">
      <div className="flex flex-col items-center justify-center text-center">
        {/* Notebook icon in circle */}
        <div className="mb-6">
          <div className="w-20 h-20 rounded-full border-2 border-base-content flex items-center justify-center bg-base-100">
            <BookOpen className="w-8 h-8 text-base-content" />
          </div>
        </div>

        {/* No notes yet text */}
        <h2 className="text-2xl md:text-3xl font-bold text-base-content mb-4 tracking-wide transform -rotate-1">
          NO NOTES YET
        </h2>

        {/* Ready to organise text */}
        <p className="text-lg md:text-xl text-base-content/80 mb-8 font-medium transform rotate-1">
          Ready to organise your thoughts?
        </p>

        {/* Create first note button */}
        <button className="bg-base-100 hover:bg-base-200 text-base-content border-2 border-base-content rounded-full px-8 py-3 text-lg font-medium transform -rotate-1 hover:rotate-0 transition-transform duration-200 shadow-lg cursor-pointer" onClick={handleRoute}>
          Create your first Note
        </button>
      </div>
    </div>
  );
}
