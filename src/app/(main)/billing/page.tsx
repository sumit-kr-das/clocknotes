import FreePlan from "@/app/(main)/billing/_components/FreePlan";
import ProPlan from "@/app/(main)/billing/_components/ProPlan";
import YearProPlan from "@/app/(main)/billing/_components/YearProPlan";
const Billing = () => {
  return (
    <div>
      <h1>Billing</h1>
      <div className="flex justify-between mt-4">
        <FreePlan />
        <ProPlan />
        <YearProPlan />
      </div>
    </div>
  );
};
export default Billing;
