import Image from "next/image";
import React from "react";
import DemoImg from "@/assets/site/demo.svg";

const Problems = () => {
  return (
    <section className="flex justify-center items-center max-w-7xl mx-auto mt-40">
      <div className="flex-1">
        <div className="w-fit rounded-full bg-secondary border border-primary px-3 py-1 text-xs text-zinc-200">
          <p className="text-sm capitalize">Problem Showdown</p>
        </div>
        <h1 className="text-5xl font-semibold my-4">
          What problem Clocknotes solve?
        </h1>
        <p className="text-muted-foreground">
          Clocknotes transforms content creation, offering a unified platform
          for creators. It solves storage issues, streamlines collaboration, and
          automates multi-platform publishing, ensuring efficient workflows and
          maximizing content impact.
          <br /> <br />
          With AI-driven capabilities, it empowers creators to overcome
          challenges, from generating ideas to seamless distribution across
          diverse platforms. YouTorus is the all-in-one solution, simplifying
          the creative journey and elevating content creation to new heights.
        </p>
      </div>
      <div className="flex-1 flex justify-end pt-8">
        <Image src={DemoImg} width={550} height={200} alt={"logo activity"} />
      </div>
    </section>
  );
};

export default Problems;
