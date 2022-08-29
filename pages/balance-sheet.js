import Layout from "../components/Layout";
import BgCard from "../components/BgCard";
import BalanceSheetTable from "../components/BalanceSheetTable";
import { useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const BalanceSheet = () => {
  const [date, setDate] = useState(new Date());
  return (
    <div>
      <Layout name={"Balance Sheet"}>
        <BgCard className="p-[2rem]">
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
        </BgCard>
        <BgCard className="my-[2rem]">
          <BalanceSheetTable date={date} />
        </BgCard>
      </Layout>
    </div>
  );
};

export default BalanceSheet;
