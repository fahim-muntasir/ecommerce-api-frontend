import Campaigns from "../components/Campaigns";
import Lookingfor from "../components/Lookingfor";
import Products from "../components/Products";
import Slider from "../components/Slider";
import MainLayout from "../layouts/MainLayout";
import NewArrival from "../components/newArrival";

const HomePage = () => {
  return (
    <MainLayout>
      <Slider />
      <NewArrival />
      <Lookingfor />
      <Products />
      <Campaigns />
    </MainLayout>
  );
};

export default HomePage;
