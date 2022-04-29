import "./App.css";
import NavBar from "./components/navBar";
import { Routes, Route, useParams } from "react-router-dom";
import Shop from "./components/shop";
import Group from "./components/group";
import Movies from "./components/movies";
import NotFound from "./components/notFound";
import MoviesForm from "./components/moviesForm";
import LoginForm from "./components/loginForm";
import Footer from "./components/footer";
import RegisterForm from "./components/registerForm";
import NewMovies from "./components/newMovies";
import Home from "./components/home";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <div className="">
      <Toaster />
      <div className="App ">
        <NavBar />
        <div className="content 		">
          <Routes>
            <Route path="/register" element={<RegisterForm />}></Route>
            <Route path="/login" element={<LoginForm />}></Route>
            <Route path="/movies/:id" element={<MoviesForm />} />
            <Route path="/movies" element={<Movies />}></Route>
            <Route path="/" element={<Movies />}></Route>
            <Route path="/shop" element={<Shop />} />
            <Route path="/test" element={<Home />} />
            <Route path="/group" element={<Group />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
