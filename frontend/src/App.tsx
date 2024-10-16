import { BrowserRouter,Routes, Route  } from "react-router-dom"
import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import { Blog } from "./pages/blog"

function App() {

  return (<div>
    <BrowserRouter>
    <Routes>
    <Route path="/signup" element={<Signup/>} />
    <Route path="/signin" element={<Signin/>} />
    <Route path="/blog" element={<Blog/>} />
    </Routes>
    </BrowserRouter>
  </div>

  )
}

export default App