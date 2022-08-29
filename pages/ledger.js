import BgCard from "../components/BgCard";
import Layout from "../components/Layout";
import LedgerTable from "../components/LedgerTable";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import Axios from "../apis/axios";

const Ledger = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const fetchAccounts = async () => {
    const res = await Axios.fetch({ url: "account" });

    if (res && res.status === 200) {
      setAccounts(res.data);
      console.log(res.data[0]);
      setSelectedAccount({ _id: res.data[0]._id, name: res.data[0].name });
    }
  };

  const handleAccount = (e) => {
    console.log(e.target.value);
    const res = accounts.filter((account) => account._id === e.target.value);
    console.log(res);
    setSelectedAccount({ _id: res[0]._id, name: res[0].name });
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <div>
      <Layout name={"Ledger"}>
        <BgCard className="p-[2rem]">
          <FormControl className="md:w-[20rem]">
            <InputLabel id="demo-simple-select-label">Account</InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedAccount && selectedAccount._id}
              label="Account"
              onChange={handleAccount}
            >
              {accounts.map((account) => (
                <MenuItem key={account._id} value={account._id}>
                  {account.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </BgCard>
        <BgCard className="my-[2rem]">
          {selectedAccount && <LedgerTable id={selectedAccount._id} />}
        </BgCard>
      </Layout>
    </div>
  );
};

export default Ledger;
