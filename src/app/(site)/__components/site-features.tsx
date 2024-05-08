import React from "react";
import { HoverEffect } from "./effects/card-hover-effects";
import { features } from "@/constants/site";
import AppFeature from "./site-app-features";

const Features = () => {
  return (
    <section className="flex justify-center items-center flex-col gap-4 md:!mt-20 mt-[-60px]">
      <h2 className="text-5xl text-center font-semibold">
        Choose what fits you right
      </h2>
      <p className="text-muted-foreground text-center">
        Our straightforward pricing plans are tailored to meet your needs. If
        {" you're"} not <br />
        ready to commit you can get started for free.
      </p>
      <div className="max-w-7xl mx-auto px-8">
        <HoverEffect items={features} />
      </div>
    </section>
  );
};

export default Features;
