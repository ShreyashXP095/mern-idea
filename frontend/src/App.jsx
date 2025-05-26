import { Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import NoteDetailPage from './pages/NoteDetailPage'
import { PaletteIcon } from 'lucide-react';
import { useState } from 'react';

const App = () => {

  const [theme,setTheme] = useState("light");

   const theme_array = [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
    ]

    const handlethemechange = () =>{
      const ranind = Math.floor(Math.random() * theme_array.length);
      setTheme(theme_array[ranind]);
    }
  return (
    <div data-theme={theme}>
    {/* <div class="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#66e_100%)]"></div> */}
    <button className='btn btn-primary float-right mt-4 mr-3' onClick={handlethemechange}><PaletteIcon/></button>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  )
};

export default App
