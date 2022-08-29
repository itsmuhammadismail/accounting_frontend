import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CircularProgress } from "@mui/material";
import Axios from "../apis/axios";

function createData(sr, particular, debit, credit) {
  return { sr, particular, debit, credit };
}

export default function TrialBalanceTable() {
  const [rows, setRows] = useState(null);

  const fetchData = async () => {
    const res = await Axios.fetch({
      url: "journal/trial",
    });

    if (res && res.status === 200) {
      console.log(res.data);

      let data = [];
      let sr = 1;
      res.data.map((r) => {
        let debit = "-",
          credit = "-";
        r.type == "debit" ? (debit = r.balance) : (credit = r.balance);
        data.push(createData(sr++, r.account, debit, credit));
      });

      setRows(data);
    }
  };

  useEffect(() => {
    setRows(null);
    fetchData();
  }, []);
  return (
    <>
      {rows ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Sr #</TableCell>
                <TableCell>Particular</TableCell>
                <TableCell>Debit</TableCell>
                <TableCell>Credit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.sr}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.sr}</TableCell>
                  <TableCell>{row.particular}</TableCell>
                  <TableCell align="right">{row.debit}</TableCell>
                  <TableCell align="right">{row.credit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div className="h-[20rem] flex justify-center items-center">
          <CircularProgress />
        </div>
      )}
    </>
  );
}
