import Main from './components/Main'
import { useState } from 'react'

function App() {
  const [bg,setBg] = useState("App")

  const changeBg = (newBg) => {setBg(newBg)}
  console.log(bg)
  return (
    <div className={bg}>
      <Main changeBg={changeBg}/>
    </div>
  );
}

export default App;
