export const getPlanId = (
  planName: string
): { planId: string; totalCount: number; credits: number } => {
  switch (planName) {
    case "free":
      return {
        totalCount: 12,
        credits: 30000,
        planId: process.env.FREE_PLAN_ID!,
      };
    case "pro":
      return {
        totalCount: 52,
        credits: 100000,
        planId: process.env.PRO_PLAN_ID!,
      };
    case "enterprise":
      return {
        totalCount: 12,
        credits: 2500000,
        planId: process.env.ENTERPRISE_PLAN_ID!,
      };
    default:
      return {
        totalCount: 12,
        credits: 30000,
        planId: process.env.FREE_PLAN_ID!,
      };
  }
};
