import "../../../assests/css/home.css";
import Hero from "./Hero";
import Stats from "./Stats";
import Package from "./Package";
import About from "./About";
import Service from "./Service";
import Whatsapp from "../../layouts/Whatsapp";
import Testimony from "../../layouts/Testimony";

const Home = () => {
  return (
    <main className="home">
      <Hero />
      <Stats />
      <Package />
      <About />
      <Service />
      <Testimony />
      <Whatsapp />
    </main>
  );
};
export default Home;
