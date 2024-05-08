import Hero from "@/app/(site)/__components/hero";
import AppFeature from "./__components/site-app-features";
import Faqs from "./__components/site-faqs";
import Features from "./__components/site-features";
import WaitList from "./__components/site-waitlist";

export default function Home() {
  return (
    <main>
      <Hero />
      {/* <Pricing /> */}
      <Features />
      <AppFeature />
      <Faqs />
      <WaitList />
    </main>
  );
}
