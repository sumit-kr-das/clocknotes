import { features } from "@/constants/site";
import { HoverEffect } from "./effects/card-hover-effects";
import SiteTitle from "./site-title";

const Features = () => {
  return (
    <section className="flex justify-center items-center flex-col gap-4 mt-20">
      <SiteTitle
        subtitle="Feature Showdown"
        title="Why To Use Clocknotes?"
        description=" Our straightforward pricing plans are tailored to meet your needs. If you're not ready to commit you can get started for free."
      />
      <div className="max-w-7xl mx-auto">
        <HoverEffect items={features} />
      </div>
    </section>
  );
};

export default Features;
