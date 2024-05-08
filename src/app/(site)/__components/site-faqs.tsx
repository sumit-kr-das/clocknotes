import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

const Faq = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other
          components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It&apos;s animated by default, but you can disable it if you
          prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const Faqs = () => {
  return (
    <section className="flex justify-center items-center flex-col gap-4 md:!mt-20 mt-[-60px]">
      <h2 className="text-5xl text-center font-semibold">OUR FAQS</h2>
      <p className="text-muted-foreground text-center">
        Frequently AskedQuestions
      </p>
      <div className="max-w-7xl w-full mx-auto px-8">
        <Faq />
      </div>
    </section>
  );
};

export default Faqs;
