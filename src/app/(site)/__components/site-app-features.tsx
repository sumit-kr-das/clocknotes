import Image from "next/image";
import React from "react";
import DemoImg from "@/assets/site/demo.svg";

const Features = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 mt-8">
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
          <p>
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
                <p>
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
                <p>
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
          <p>
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
                <p>
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
                <p>
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
    <section className="flex justify-center items-center flex-col gap-4 md:!mt-20 mt-[-60px]">
      <h2 className="text-5xl text-center font-semibold">
        Unveiling the Clocknotes Advantage
      </h2>
      <p className="text-muted-foreground text-center">
        Clocknotes transforms content creation, offering a unified platform for
        creators
      </p>
      <div className="max-w-7xl w-full mx-auto px-8">
        <Features />
      </div>
    </section>
  );
};

export default AppFeature;
