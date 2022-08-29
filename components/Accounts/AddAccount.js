import { CircularProgress } from "@mui/material";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useEffect, useState } from "react";
import Axios from "../../apis/axios";

const AddAccount = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const [accounts, setAccounts] = useState([
    "Asset",
    "Expense",
    "Drawing",
    "Liabilities",
    "Revenue",
    "Capital",
  ]);
  const [selectedAccount, setSelectedAccount] = useState("Asset");

  const MySwal = withReactContent(Swal);

  const onSubmit = (data) => handleAccount(data);

  const handleAccount = async (data) => {
    setIsLoading(true);

    const res = await Axios.fetch({
      method: "POST",
      url: "account",
      data: {
        name: data.name,
        type: selectedAccount.toLowerCase(),
      },
    });

    if (res && res.status === 201) {
      setIsLoading(false);
      await MySwal.fire({
        title: "Account Created Successfully",
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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 mb-[2rem]"
    >
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        type="text"
        className="md:w-[20rem]"
        {...register("name", { required: true })}
      />
      {errors.name && (
        <p className="text-sm text-red-500">This field is required.</p>
      )}
      <FormControl className="md:w-[20rem]">
        <InputLabel id="demo-simple-select-label">Account</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedAccount}
          label="Account"
          onChange={(e) => setSelectedAccount(e.target.value)}
        >
          {accounts.map((account) => (
            <MenuItem key={account} value={account}>
              {account}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        className="bg-[#377DFF] md:w-[20rem] h-[3rem]"
        type="submit"
      >
        {isLoading ? (
          <CircularProgress style={{ color: "white" }} size="20px" />
        ) : (
          "Add Account"
        )}
      </Button>
    </form>
  );
};

export default AddAccount;
