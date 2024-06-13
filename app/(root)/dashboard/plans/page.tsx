import Breadcrumb from "@/components/dashboard/Breadcrumb";
import PricingSection from "@/sections/PricingSection";

export default function Plans() {
  return (
    <div>
      <Breadcrumb />
      <PricingSection inDashboard />
    </div>
  );
}
