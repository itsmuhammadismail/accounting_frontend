import BgCard from "../components/BgCard";
import IncomeStatementTable from "../components/IncomeStatementTable";
import Layout from "../components/Layout";

const IncomeStatement = () => {
  return (
    <div>
      <Layout name={"Income Statement"}>
        <BgCard className="">
          <IncomeStatementTable />
        </BgCard>
      </Layout>
    </div>
  );
};

export default IncomeStatement;
