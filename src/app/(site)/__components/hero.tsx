import Image from "next/image";
import LogoActivity from "@/assets/only-logo.svg";
import PreviewImg from "@/assets/site/preview.png";

const Hero = () => {
  return (
    <header className="w-full h-full relative md:pt-44 mt-[-70px]">
      <div className="absolute top-0 left-0 bottom-0 right-0 dark:bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10" />
      <div className="flex items-center justify-center mt-12">
        <span className="relative group inline-block w-fit mx-auto overflow-hidden rounded-full p-[1px]">
          <div className="flex gap-1 h-full group w-full items-center justify-center rounded-full bg-primary px-3 py-1 text-xs text-zinc-200 backdrop-blur-3xl hover:backdrop-blur-2xl hover:shadow-lg transition-all duration-200 ease-in-out">
            <Image
              src={LogoActivity}
              width={20}
              height={20}
              alt={"logo activity"}
            />
            <p>Free TimeTracking & Timesheet Management Software</p>
          </div>
        </span>
      </div>
      <div className="mt-4 bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative">
        <h1 className="text-9xl font-bold text-center md:text-[250px]">
          Clocknotes
        </h1>
      </div>
      <div className="flex items-center justify-center relative md:mt-[-40px]">
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
