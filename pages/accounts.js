import AccountsTable from "../components/Accounts/AccountsTable";
import AddAccount from "../components/Accounts/AddAccount";
import BgCard from "../components/BgCard";
import Layout from "../components/Layout";

const AccountsPage = () => {
  return (
    <div>
      <Layout name={"Accounts"}>
        <BgCard className="p-[2rem]">
          <AddAccount />
        </BgCard>
        <BgCard className="my-[2rem]">
          <AccountsTable />
        </BgCard>
      </Layout>
    </div>
  );
};

export default AccountsPage;
