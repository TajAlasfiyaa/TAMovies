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
function App() {
  return (
    <div className="App min-h-full">
      <NavBar />
      <div className="content 		">
        <Routes>
          <Route path="/register" element={<RegisterForm />}></Route>
          <Route path="/login" element={<LoginForm />}></Route>
          <Route path="/movies/:id" element={<MoviesForm />} />
          <Route path="/movies" element={<Movies />}></Route>
          <Route path="/" element={<Movies />}></Route>
          <Route path="/shop" element={<Shop />} />
          <Route path="/group" element={<Group />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
