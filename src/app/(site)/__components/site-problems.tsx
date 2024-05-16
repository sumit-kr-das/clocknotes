import Image from "next/image";
import React from "react";
import DemoImg from "@/assets/site/demo.svg";

const Problems = () => {
  return (
    <section className="flex justify-center items-center max-w-7xl mx-auto mt-40">
      <div className="flex-1">
        <div className="w-fit rounded-full bg-primary dark:bg-secondary border border-primary px-3 py-1 text-sm">
          <p className="text-white dark:text-zinc-200">Problem Showdown</p>
        </div>
        <h1 className="text-5xl font-semibold my-4">
          What problem Clocknotes solve?
        </h1>
        <p className="text-muted-foreground">
          Clocknotes helps to track time and manage your projects with different
          teams to boost your organisation productivity through a modern user
          friendly time tracking software. It tracks time, manage teams, manage
          projects, track tasks, create notes, manage clients record, generate
          reports, billing and invoices, manage workspaces for free.
          <br /> <br />
          Clocknotes provides various features in its platform which are not
          available in other platforms for small startups and organisations.
        </p>
      </div>
      <div className="flex-1 flex justify-end pt-8">
        <Image src={DemoImg} width={550} height={200} alt={"logo activity"} />
      </div>
    </section>
  );
};

export default Problems;
