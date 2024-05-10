import Image from "next/image";
import React from "react";
import DemoImg from "@/assets/site/demo.svg";
import SiteTitle from "./site-title";

const Features = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="w-full flex">
          <Image src={DemoImg} width={550} height={200} alt={"logo activity"} />
        </div>
        <div>
          <div className="w-fit rounded-full bg-secondary border border-primary px-3 py-1 text-xs text-zinc-200">
            <p className="text-sm">COLLABORATE SMARTER, PUBLISH FASTER</p>
          </div>
          <h2 className="font-bold text-4xl my-4">
            A Complete Solution for Content Creators
          </h2>
          <p className="text-muted-foreground">
            Elevate your project management experience with our collaboration
            platform. Seamlessly connect team members, foster efficient
            communication, and enhance productivity throughout your projects.
          </p>
          <div className="mt-4">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-14 h-14 bg-secondary border rounded-full">
                  <p className="font-bold">01</p>
                </div>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">Storage Worry-Free</h4>
                <p className="text-muted-foreground">
                  Enjoy peace of mind with our centralized storage solution,
                  eliminating clutter and storage limitations for all your media
                  assets.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-14 h-14 bg-secondary border rounded-full">
                  <p className="font-bold">02</p>
                </div>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">
                  Effortless Multi-Platform Publishing
                </h4>
                <p className="text-muted-foreground">
                  With automated multi-platform publishing, distribute your
                  content seamlessly across various platforms, saving you time
                  and effort while expanding your reach.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-8">
        <div>
          <div className="w-fit rounded-full bg-secondary border border-primary px-3 py-1 text-xs text-zinc-200">
            <p className="text-sm">COLLABORATE SMARTER, PUBLISH FASTER</p>
          </div>
          <h2 className="font-bold text-4xl my-4">
            A Complete Solution for Content Creators
          </h2>
          <p className="text-muted-foreground">
            Elevate your project management experience with our collaboration
            platform. Seamlessly connect team members, foster efficient
            communication, and enhance productivity throughout your projects.
          </p>
          <div className="mt-4">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-14 h-14 bg-secondary border rounded-full">
                  <p className="font-bold">01</p>
                </div>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">Storage Worry-Free</h4>
                <p className="text-muted-foreground">
                  Enjoy peace of mind with our centralized storage solution,
                  eliminating clutter and storage limitations for all your media
                  assets.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-14 h-14 bg-secondary border rounded-full">
                  <p className="font-bold">02</p>
                </div>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">
                  Effortless Multi-Platform Publishing
                </h4>
                <p className="text-muted-foreground">
                  With automated multi-platform publishing, distribute your
                  content seamlessly across various platforms, saving you time
                  and effort while expanding your reach.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex">
          <Image src={DemoImg} width={550} height={200} alt={"logo activity"} />
        </div>
      </div>
    </>
  );
};

const AppFeature = () => {
  return (
    <section className="flex justify-center items-center flex-col gap-4 mt-20">
      <SiteTitle
        subtitle="Clocknotes Feature"
        title="Unveiling the Clocknotes Advantage"
        description="Clocknotes transforms content creation, offering a unified platform for
        creators"
      />
      <div className="max-w-7xl w-full mx-auto mt-10">
        <Features />
      </div>
    </section>
  );
};

export default AppFeature;
