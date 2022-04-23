import "./App.css";
import NavBar from "./components/navBar";
import { Routes, Route } from "react-router-dom";
import Shop from "./components/shop";
import Group from "./components/group";
import Movies from "./components/movies";
import NotFound from "./components/notFound";
import MoviesForm from "./components/moviesForm";
import LoginForm from "./components/loginForm";
import Footer from "./components/footer";
function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="content h-screen		">
        <Routes>
          <Route path="/movie" element={<MoviesForm />}>
            <Route path=":id" element={<MoviesForm />} />
          </Route>
          <Route path="/login" element={<LoginForm />}></Route>
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
