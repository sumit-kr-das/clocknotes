import Image from "next/image";
import LogoActivity from "@/assets/only-logo.svg";
import PreviewImg from "@/assets/site/preview.png";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <header className="w-full h-full relative md:pt-44 mt-[-70px]">
      <div className="absolute top-0 left-0 bottom-0 right-0 dark:bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10" />
      <div className="flex items-center justify-center mt-12">
        <div className="w-fit flex items-center gap-1 rounded-full bg-primary dark:bg-secondary border border-primary pl-2 pr-3 py-1 text-sm">
          <Image
            src={LogoActivity}
            width={20}
            height={20}
            alt={"logo activity"}
          />
          <p className="text-white dark:text-zinc-200">clocknotes.cloud</p>
        </div>
      </div>
      <div className="mb-20">
        <div
          className="absolute m-auto blur-[180px] max-w-xs h-[33rem] top-12 inset-0 z-0"
          style={{
            background:
              "linear-gradient(180deg, #7C3AED 0%, rgba(152, 103, 240, 0.984375) 0.01%, rgba(237, 78, 80, 0.2) 100%)",
          }}
        ></div>
        <div className="flex items-center justify-center flex-col relative z-10">
          <h1 className="text-5xl text-center font-black my-4">
            Free TimeTracking & Timesheet <br /> Management Software
          </h1>
          <p className="text-muted-foreground text-center">
            Clocknotes is a time tracker and timesheet app that <br /> lets you
            track work hours across projects. Unlimited users, free forever.
          </p>
          <Button className="mt-4">Join the waitlist</Button>
        </div>
      </div>
      <div className="flex items-center justify-center relative ">
        <Image
          src={PreviewImg}
          width={1200}
          height={1200}
          alt="preview img"
          className="rounded-tl-2xl rounded-tr-2xl border-2 border-muted"
        />
        <div className="bottom-0 top-[50%] left-0 right-0 absolute z-10 bg-gradient-to-t dark:from-background" />
      </div>
    </header>
  );
};

export default Hero;
