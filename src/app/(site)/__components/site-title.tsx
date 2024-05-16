import React from "react";
import BackgroundElement from "@/assets/site/bg-title.webp";
import Image from "next/image";

const SiteTitle = ({
  subtitle,
  title,
  description,
}: {
  subtitle: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="relative py-18">
      <div
        className="absolute m-auto blur-[160px] max-w-xs h-[13rem] top-12 inset-0 z-0"
        style={{
          background:
            "linear-gradient(180deg, #7C3AED 0%, rgba(152, 103, 240, 0.984375) 0.01%, rgba(237, 78, 80, 0.2) 100%)",
        }}
      ></div>
      <div className="relative z-20">
        <div className="flex items-center justify-center">
          <div className="w-fit rounded-full bg-primary dark:bg-secondary border border-primary px-3 py-1 text-sm">
            <p className="text-sm capitalize text-white dark:text-zinc-200">
              {subtitle}
            </p>
          </div>
        </div>
        <h1 className="text-5xl text-center font-semibold my-4">{title}</h1>
        <p className="text-muted-foreground text-center">{description}</p>
      </div>
      <Image
        src={BackgroundElement}
        width={1200}
        height={600}
        alt="background-element"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
};

export default SiteTitle;
