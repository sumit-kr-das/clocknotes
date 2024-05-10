import React from "react";
import { HoverEffect } from "./effects/card-hover-effects";
import { features } from "@/constants/site";
import AppFeature from "./site-app-features";
import SiteTitle from "./site-title";

const Features = () => {
  return (
    <section className="flex justify-center items-center flex-col gap-4 md:!mt-20 mt-[-60px]">
      <SiteTitle
        subtitle="Feature Showdown"
        title="Choose what fits you right"
        description=" Our straightforward pricing plans are tailored to meet your needs. If you're not ready to commit you can get started for free."
      />
      <div className="max-w-7xl mx-auto px-8">
        <HoverEffect items={features} />
      </div>
    </section>
  );
};

export default Features;
