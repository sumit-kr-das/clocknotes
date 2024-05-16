import Hero from "@/app/(site)/__components/site-hero";
import AppFeature from "./__components/site-app-features";
import Faqs from "./__components/site-faqs";
import Features from "./__components/site-features";
import Problems from "./__components/site-problems";
import Wishlist from "./__components/site-wishlist";
import Footer from "./__components/site-footer";

export default function Home() {
  return (
    <main>
      <Hero />
      {/* <Pricing /> */}
      <Problems />
      <Features />
      <AppFeature />
      <Faqs />
      <Wishlist />
      <Footer />
    </main>
  );
}
