import Head from "next/head";
import Image from "next/image";
import BgCard from "../components/BgCard";
import Layout from "../components/Layout";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Axios from "../apis/axios";

export default function Home() {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [debitAccount, setDebitAccount] = useState({ _id: "", name: "" });
  const [debitDesc, setDebitDesc] = useState("");
  const [debitAmount, setDebitAmount] = useState("");
  const [creditAccount, setCreditAccount] = useState({ _id: "", name: "" });
  const [creditDesc, setCreditDesc] = useState("");
  const [creditAmount, setCreditAmount] = useState("");

  const fetchAccounts = async () => {
    const res = await Axios.fetch({ url: "account" });

    if (res && res.status === 200) {
      setAccounts(res.data);
      console.log(res.data[0]);
      setSelectedAccount({ _id: res.data[0]._id, name: res.data[0].name });
      setDebitAccount({
        _id: res.data[0]._id,
        name: res.data[0].name,
      });
      setCreditAccount({
        _id: res.data[0]._id,
        name: res.data[0].name,
      });
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const [date, setDate] = useState(new Date());

  const [isLoading, setIsLoading] = useState(false);

  const MySwal = withReactContent(Swal);

  const handleJournalEntry = async () => {
    if (debitAmount != creditAmount) {
      await MySwal.fire({
        title: "Debit and Credit are not balanced",
        icon: "error",
      });
      return;
    }

    setIsLoading(true);

    const res = await Axios.fetch({
      method: "POST",
      url: "journal",
      data: {
        date: date,
        debit: [
          {
            account: debitAccount._id,
            particular: debitDesc,
            amount: debitAmount,
          },
        ],
        credit: [
          {
            account: creditAccount._id,
            particular: creditDesc,
            amount: creditAmount,
          },
        ],
      },
    });

    if (res && res.status === 201) {
      setIsLoading(false);
      await MySwal.fire({
        title: "Journal Entry Created Successfully",
        icon: "success",
      });
    } else {
      setIsLoading(false);
      await MySwal.fire({
        title: "Something went wrong",
        text: res.message,
        icon: "error",
      });
    }
  };

  const handleDebitAccount = (e) => {
    const res = accounts.filter((account) => account._id === e.target.value);

    setDebitAccount({
      _id: res[0]._id,
      name: res[0].name,
    });
  };

  const handleCreditAccount = (e) => {
    const res = accounts.filter((account) => account._id === e.target.value);

    setCreditAccount({
      _id: res[0]._id,
      name: res[0].name,
    });
  };

  return (
    <div>
      <Head>
        <title>Accounting</title>
      </Head>
      <Layout name="Journal Entry">
        <BgCard className="p-[2rem]">
          <form className="flex flex-col gap-5 mb-[2rem]">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <div className="">
                <DesktopDatePicker
                  label="Date"
                  className="md:w-[20rem]"
                  inputFormat="MM/dd/yyyy"
                  value={date}
                  onChange={(value) => setDate(value)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </div>
            </LocalizationProvider>

            <h2 className="font-semibold text-xl">Debits</h2>

            <FormControl className="md:w-[20rem]">
              <InputLabel id="demo-simple-select-label">Account</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={debitAccount && debitAccount._id}
                label="Account"
                onChange={handleDebitAccount}
              >
                {accounts.map((account) => (
                  <MenuItem key={account._id} value={account._id}>
                    {account.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              type="text"
              className="md:w-[20rem]"
              value={debitDesc}
              onChange={(e) => setDebitDesc(e.target.value)}
            />

            <TextField
              id="outlined-basic"
              label="Amount"
              variant="outlined"
              type="number"
              className="md:w-[20rem]"
              value={debitAmount}
              onChange={(e) => setDebitAmount(e.target.value)}
            />

            <h2 className="font-semibold text-xl">Credits</h2>

            <FormControl className="md:w-[20rem]">
              <InputLabel id="demo-simple-select-label">Account</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={creditAccount && creditAccount._id}
                label="Account"
                onChange={handleCreditAccount}
              >
                {accounts.map((account) => (
                  <MenuItem key={account._id} value={account._id}>
                    {account.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              type="text"
              className="md:w-[20rem]"
              value={creditDesc}
              onChange={(e) => setCreditDesc(e.target.value)}
            />

            <TextField
              id="outlined-basic"
              label="Amount"
              variant="outlined"
              type="number"
              className="md:w-[20rem]"
              value={creditAmount}
              onChange={(e) => setCreditAmount(e.target.value)}
            />

            <Button
              variant="contained"
              className="bg-[#377DFF] md:w-[20rem] h-[3rem]"
              onClick={handleJournalEntry}
            >
              {isLoading ? (
                <CircularProgress style={{ color: "white" }} size="20px" />
              ) : (
                "Add Journal Entry"
              )}
            </Button>
          </form>
        </BgCard>
      </Layout>
    </div>
  );
}
