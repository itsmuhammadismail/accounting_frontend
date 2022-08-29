import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
import Axios from "../../apis/axios";
import { CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const columns = ["Name", "Type", "Action"];

const options = {
  filterType: "checkbox",
};

const AccountsTable = () => {
  const [data, setData] = useState(null);
  const MySwal = withReactContent(Swal);

  const fetchData = async () => {
    const res = await Axios.fetch({ url: "account" });

    let data = [];

    const deleteUser = async (id) => {
      console.log(id);
      await MySwal.fire({
        title: "Are you sure? you want to delete this account",
        icon: "question",
        showCancelButton: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await Axios.fetch({
            method: "delete",
            url: "account",
            data: { id: id },
          });
          await fetchData();
        }
      });
    };

    if (res && res.status === 200) {
      res.data.map((r) => {
        data.push([
          r.name,
          r.type,
          <CloseIcon
            className="cursor-pointer"
            key={r.user_id}
            onClick={() => deleteUser(r._id)}
          />,
        ]);
      });
      setData(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {data ? (
        <MUIDataTable
          title={"Accounts"}
          data={data}
          columns={columns}
          options={options}
        />
      ) : (
        <div className="h-[20rem] flex justify-center items-center">
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default AccountsTable;
