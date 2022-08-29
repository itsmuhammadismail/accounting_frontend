import BgCard from "../components/BgCard";
import Layout from "../components/Layout";
import TrialBalanceTable from "../components/TrialBalanceTable";

const TrialBalance = () => {
  return (
    <div>
      <Layout name={"Trial Balance"}>
        <BgCard className="">
          <TrialBalanceTable />
        </BgCard>
      </Layout>
    </div>
  );
};

export default TrialBalance;
