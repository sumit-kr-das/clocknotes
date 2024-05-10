import React from "react";
import { HoverEffect } from "./effects/card-hover-effects";
import { features } from "@/constants/site";
import AppFeature from "./site-app-features";
import SiteTitle from "./site-title";

const Features = () => {
  return (
    <section className="flex justify-center items-center flex-col gap-4 mt-20">
      <SiteTitle
        subtitle="Feature Showdown"
        title="Choose what fits you right"
        description=" Our straightforward pricing plans are tailored to meet your needs. If you're not ready to commit you can get started for free."
      />
      <div className="max-w-7xl mx-auto">
        <HoverEffect items={features} />
      </div>
    </section>
  );
};

export default Features;
