import React from "react";
import LinkedinIcn from "@/assets/site/social/linkedin.svg";
import RedditIcn from "@/assets/site/social/redit.svg";
import XIcn from "@/assets/site/social/x.svg";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="max-w-7xl w-full mx-auto p-8 flex items-center justify-between  border-t">
      <div>© 2024 clocknotes.cloud. All rights reserved.</div>
      <div className="flex items-center justify-between gap-4">
        <Link href="https://www.linkedin.com/company/clocknotes/">
          <Image src={LinkedinIcn} width={30} height={30} alt={"Linkedin"} />
        </Link>
        <Link href="https://www.reddit.com/r/clocknotes/">
          <Image src={RedditIcn} width={30} height={30} alt={"Reddit"} />
        </Link>
        <Link href="https://twitter.com/clocknotes">
          <Image src={XIcn} width={30} height={30} alt={"X"} />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
