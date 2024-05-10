import React from "react";
import SiteTitle from "./site-title";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const WishlistForm = () => {
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center mt-20 rounded-md">
      {/* <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-xl bg-gradient-to-t from-transparent to-[#dee7ff47] dark:bg-gradient-to-t dark:to-[#252A42]"></div> */}
      <div className="w-[800px] p-8 bg-secondary rounded-md">
        <form className="block w-full">
          <div className="flex gap-4">
            <Input type="text" placeholder="Full name*" className="w-full" />
            <Input
              type="email"
              placeholder="Email address*"
              className="w-full"
            />
          </div>
          <Textarea placeholder="Message" className="w-full h-40 my-4" />
          <Button variant="outline" className="float-right">
            Join the waitlist
          </Button>
        </form>
      </div>
    </div>
  );
};

const Wishlist = () => {
  return (
    <section className="flex justify-center items-center flex-col gap-4 md:!mt-20 mt-[-60px]">
      <SiteTitle
        subtitle="waitlist"
        title="Join the waitlist"
        description=" Our straightforward pricing plans are tailored to meet your needs. If you're not ready to commit you can get started for free."
      />
      <div className="max-w-7xl w-full mx-auto px-8">
        <WishlistForm />
      </div>
    </section>
  );
};

export default Wishlist;
