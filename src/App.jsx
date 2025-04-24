import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Counter from "./pages/Counter";
import Todo from "./pages/Todo";
import Weather from "./pages/Weather";
import Quiz from "./pages/Quiz";
import ShoppingCart from "./pages/ShoppingCart";
import ImageGallery from "./pages/ImageGallery";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/counter" element={<Counter />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/gallery" element={<ImageGallery />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
