import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
  "Time Tracking",
  "Time Sheet Management",
  "Workspaces and Teams",
  "Projects",
  "Tasks",
  "Add clients",
  "Generate reports",
  "Billings",
  "Role management",
];

const Pricing = () => {
  return (
    <section className="flex justify-center items-center flex-col gap-4 md:!mt-20 mt-[-60px]">
      <h2 className="text-4xl text-center font-semibold">
        {" "}
        Choose what fits you right
      </h2>
      <p className="text-muted-foreground text-center">
        Our straightforward pricing plans are tailored to meet your needs. If
        {" you're"} not <br />
        ready to commit you can get started for free.
      </p>
      <div className="flex justify-center gap-4 flex-wrap mt-6">
        <Card
          className={
            "w-[300px] flex flex-col justify-between border-2 border-primary"
          }
        >
          <CardHeader>
            <CardTitle className={"text-muted-foreground"}>
              Premium Starter
            </CardTitle>
            <CardDescription>
              Works for freelancers and very small teams
            </CardDescription>
          </CardHeader>
          <CardContent>
            <span className="text-4xl font-bold">$0</span>
            <span className="text-muted-foreground">
              <span>/lifetime</span>
            </span>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-4">
            <div>
              {plans.map((item, index) => (
                <div className="flex gap-2" key={index}>
                  <Check />
                  <p>{item}</p>
                </div>
              ))}
            </div>
            <Link
              href={`/`}
              className={"w-full text-center bg-primary p-2 rounded-md"}
            >
              Get Started
            </Link>
          </CardFooter>
        </Card>
        <Card className={"w-[300px] flex flex-col justify-between"}>
          <CardHeader>
            <CardTitle className={""}>Premium Teams</CardTitle>
            <CardDescription>descrption</CardDescription>
          </CardHeader>
          <CardContent>
            <span className="text-4xl font-bold">$0</span>
            <span>/ month</span>
          </CardContent>
          <CardFooter className="flex flex-col  items-start gap-4 ">
            <div>
              {plans.map((item, index) => (
                <div className="flex gap-2" key={index}>
                  <Check />
                  <p>{item}</p>
                </div>
              ))}
            </div>
            <Link
              href="/agency"
              className={"w-full text-center bg-primary p-2 rounded-md"}
            >
              Coming soon
            </Link>
          </CardFooter>
        </Card>
        <Card className={"w-[300px] flex flex-col justify-between"}>
          <CardHeader>
            <CardTitle className={""}>Enterprise</CardTitle>
            <CardDescription>descrption</CardDescription>
          </CardHeader>
          <CardContent>
            <span className="text-4xl font-bold">Custom Quote</span>
          </CardContent>
          <CardFooter className="flex flex-col  items-start gap-4 ">
            <div>
              {plans.map((item, index) => (
                <div className="flex gap-2" key={index}>
                  <Check />
                  <p>{item}</p>
                </div>
              ))}
            </div>
            <Link
              href="/agency"
              className={"w-full text-center bg-primary p-2 rounded-md"}
            >
              Coming soon
            </Link>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default Pricing;
