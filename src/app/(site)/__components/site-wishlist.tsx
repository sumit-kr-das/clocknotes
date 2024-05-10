import React from "react";
import SiteTitle from "./site-title";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const WishlistForm = () => {
  return (
    <div className="flex justify-between p-8 rounded-md z-20">
      <form className="block w-[800px] ">
        <div className="flex gap-4">
          <input
            id="name"
            type="text"
            placeholder="Full name*"
            className="w-full p-4 bg-transparent outline-none border-b-2 border-primary"
          />
          <input
            id="email"
            type="email"
            placeholder="Email address*"
            className="w-full p-4 bg-transparent outline-none border-b-2 border-primary"
          />
        </div>
        <textarea
          placeholder="Message"
          className="mt-4 w-full p-4 bg-transparent outline-none border-b-2 border-primary"
        />
        <Button variant="outline" className="float-right mt-4">
          Join the waitlist
        </Button>
      </form>
      <div>
        <h1 className="text-2xl font-semibold my-4">Find us</h1>
        <div>
          <h6 className="text-md font-medium mt-4">Email Address</h6>
          <p className="text-sm">contact@clocknotes.cloud</p>
        </div>
      </div>
    </div>
  );
};

const Wishlist = () => {
  return (
    <section className="flex justify-center items-center flex-col gap-4 mt-20 mb-8">
      <SiteTitle
        subtitle="waitlist"
        title="Join the waitlist"
        description=" Our straightforward pricing plans are tailored to meet your needs. If you're not ready to commit you can get started for free."
      />
      <div className="max-w-7xl w-full mx-auto mt-10">
        <WishlistForm />
      </div>
    </section>
  );
};

export default Wishlist;
