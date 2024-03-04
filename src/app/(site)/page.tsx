import PreviewImg from "@/assets/site/preview.png";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <section className="w-full h-full relative md:pt-44 mt-[-70px]">
        <div className="absolute top-0 left-0 bottom-0 right-0 dark:bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10" />
        <p className="text-center">
          <span className="px-4 py-2 border-2 rounded-full text-primary">
            🏢 Run your agency, in one place
          </span>
        </p>
        <div className="bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative">
          <h1 className="text-9xl font-bold text-center md:text-[300px]">
            TimeTrack
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
      </section>
    </main>
  );
}
