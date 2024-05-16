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
          <div className="w-fit rounded-full bg-primary dark:bg-secondary border border-primary px-3 py-1 text-xs">
            <p className="text-sm capitalize text-white dark:text-zinc-200">
              NEED DATA
            </p>
          </div>
          <h2 className="font-bold text-4xl my-4">
            A Complete Solution For Teams For Time Management
          </h2>
          <p className="text-muted-foreground">
            Elevate your project management experience with our collaborative
            time tracking software. Create teams and connect team members, track
            project working times according to teams and increase productivity
            throughout the projects.
          </p>
          <div className="mt-4">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-14 h-14 bg-secondary border rounded-full">
                  <p className="font-bold">01</p>
                </div>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">Multi Workspace</h4>
                <p className="text-muted-foreground">
                  Manage your project through creating many workspaces and
                  adding teams members and track and manage time and project
                  through the workspace.
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
                  Teams Timesheets Management
                </h4>
                <p className="text-muted-foreground">
                  Easily add tasks and todos in timesheet and manage timesheet
                  entries within a user friendly understandable timesheet
                  through our software.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-8">
        <div>
          <div className="w-fit rounded-full bg-primary dark:bg-secondary border border-primary px-3 py-1 text-xs">
            <p className="text-sm capitalize text-white dark:text-zinc-200">
              NEED DATA
            </p>
          </div>
          <h2 className="font-bold text-4xl my-4">
            Productive Insights Generations
          </h2>
          <p className="text-muted-foreground">
            Productive Insights Generations is your gateway to unlocking the
            full potential of your team{"'"}s productivity. By harnessing the
            power of data analytics, our platform provides invaluable insights
            into the efficiency and effectiveness of both your teams and
            individual employees.
          </p>
          <div className="mt-4">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-14 h-14 bg-secondary border rounded-full">
                  <p className="font-bold">01</p>
                </div>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">
                  Comprehensive Performance Metrics
                </h4>
                <p className="text-muted-foreground">
                  Gain a comprehensive overview of your team{"'"}s and
                  individual employees{"'"} productivity levels. Track completed
                  tasks, project milestones, and time spent to identify
                  strengths and areas for improvement.
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
                  Customizable Reporting
                </h4>
                <p className="text-muted-foreground">
                  Generate customised reports tailored to your specific needs.
                  From team-wide productivity trends to individual performance
                  assessments, our analytics offer unparalleled flexibility to
                  suit your unique requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex">
          <Image src={DemoImg} width={550} height={200} alt={"logo activity"} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="w-full flex">
          <Image src={DemoImg} width={550} height={200} alt={"logo activity"} />
        </div>
        <div>
          <div className="w-fit rounded-full bg-primary dark:bg-secondary border border-primary px-3 py-1 text-xs">
            <p className="text-sm capitalize text-white dark:text-zinc-200">
              NEED DATA
            </p>
          </div>
          <h2 className="font-bold text-4xl my-4">
            Automation Billing & Invoice
          </h2>
          <p className="text-muted-foreground">
            Say good by to manual invoicing and embrace efficiency with
            automated billing and invoicing. Generate accurate billing for your
            clients with minimal effort. Lets our time tracking software
            automatically handel billing and so that it increase your
            productivity.
          </p>
          <div className="mt-4">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-14 h-14 bg-secondary border rounded-full">
                  <p className="font-bold">01</p>
                </div>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">Seamless Integration</h4>
                <p className="text-muted-foreground">
                  Effortlessly transform productivity metrics into billing and
                  invoicing documents. Our time sheet management software
                  seamlessly integrates with billing systems, allowing you to
                  generate accurate bills and invoices based on tracked work
                  hours and completed tasks.
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
                  Time-Saving Automation
                </h4>
                <p className="text-muted-foreground">
                  Lets ignore manual invoice and billing generation focus on
                  working hours. With automated billing and invoicing, you can
                  save time and reduce administrative overhead, ensuring prompt
                  and accurate billing for your clients
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-8">
        <div>
          <div className="w-fit rounded-full bg-primary dark:bg-secondary border border-primary px-3 py-1 text-xs">
            <p className="text-sm capitalize text-white dark:text-zinc-200">
              NEED DATA
            </p>
          </div>
          <h2 className="font-bold text-4xl my-4">
            Comprehensive Workflow Management
          </h2>
          <p className="text-muted-foreground">
            Clocknotes also provide organisations a seamless platform for track
            their projects, tasks, clients with custom roles and setting so that
            they can handel the workflow of team automatically with in a
            software.
          </p>
          <div className="mt-4">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-14 h-14 bg-secondary border rounded-full">
                  <p className="font-bold">01</p>
                </div>
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">
                  Visual Project Management
                </h4>
                <p className="text-muted-foreground">
                  Stay informed about project milestones and timelines with
                  intuitive progress tracking tools. Visualise project
                  timelines, manage task dependencies, and address bottlenecks
                  promptly to keep projects on track.
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
                  Custom Roles & Setting
                </h4>
                <p className="text-muted-foreground">
                  Our timesheet management software offers customizable roles
                  like admin, superadmin, and tailored settings, empowering
                  users with precise control over access and permissions.
                  Whether managing the entire system or specific tasks, our
                  platform ensures flexibility to align with diverse
                  organisational needs, enhancing efficiency and user
                  experience.
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
