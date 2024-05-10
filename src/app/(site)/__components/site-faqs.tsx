import SiteTitle from "./site-title";
import { faqData } from "@/constants/site";

type ItemProps = {
  item: {
    question: string;
    answer: string;
  }[];
};

const Faq = ({ item }: ItemProps) => {
  return (
    <div className="grid grid-cols-3 gap-12">
      {item.map((item, index) => (
        <div key={index}>
          <h2 className="font-bold text-md my-4">{item.question}</h2>
          <p className="text-muted-foreground">{item.answer}</p>
        </div>
      ))}
      <div></div>
    </div>
  );
};

const Faqs = () => {
  return (
    <section className="flex justify-center items-center flex-col gap-4 mt-20">
      <SiteTitle
        subtitle="FAQ"
        title="Everything you need to know"
        description="Here are the most questions people always ask about."
      />
      <div className="max-w-7xl w-full mx-auto mt-10">
        <Faq item={faqData} />
      </div>
    </section>
  );
};

export default Faqs;
