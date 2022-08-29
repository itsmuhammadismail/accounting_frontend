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

function createData(
  debitDate,
  debitParticular,
  debit,
  creditDate,
  creditParticular,
  credit
) {
  return {
    debitDate,
    debitParticular,
    debit,
    creditDate,
    creditParticular,
    credit,
  };
}

export default function LedgerTable({ id }) {
  const [rows, setRows] = useState(null);
  const [balance, setBalance] = useState({
    type: "debit",
    amount: 0,
  });
  const [totalDebit, setTotalDebit] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);

  const fetchData = async () => {
    const res = await Axios.fetch({
      url: "journal/ledger",
      params: { id: id },
    });

    if (res && res.status === 200) {
      console.log(res.data);

      let length = res.data.debit.length;
      if (res.data.debit.length < res.data.credit.length)
        length = res.data.credit.length;

      let data = [];

      setTotalDebit(0);
      setTotalCredit(0);

      setBalance(res.data.balance)

      // res.data.balance.type
      //   ? setTotalDebit(res.data.balance.amount)
      //   : setTotalCredit(res.data.balance.amount);

      for (let i = 0; i < length; i++) {
        try {
          data.push(
            createData(
              res.data.debit[i].date,
              res.data.debit[i].particular,
              res.data.debit[i].amount,
              res.data.credit[i].date,
              res.data.credit[i].particular,
              res.data.credit[i].amount
            )
          );
          setTotalDebit((total) => total + res.data.debit[i].amount);
          setTotalCredit((total) => total + res.data.credit[i].amount);
        } catch (e) {
          if (res.data.debit.length < res.data.credit.length) {
            data.push(
              createData(
                "",
                "",
                "",
                res.data.credit[i].date,
                res.data.credit[i].particular,
                res.data.credit[i].amount
              )
            );
            setTotalCredit((total) => total + res.data.credit[i].amount);
          } else {
            data.push(
              createData(
                res.data.debit[i].date,
                res.data.debit[i].particular,
                res.data.debit[i].amount,
                "",
                "",
                ""
              )
            );
            setTotalDebit((total) => total + res.data.debit[i].amount);
          }
        }
      }

      setRows(data);
    }
  };

  useEffect(() => {
    setRows(null);
    fetchData();
  }, [id]);
  return (
    <>
      {rows ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Particular</TableCell>
                <TableCell>Debit</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Particular</TableCell>
                <TableCell>Credit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.debitParticular}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.debitDate}</TableCell>
                  <TableCell>{row.debitParticular}</TableCell>
                  <TableCell align="right">{row.debit}</TableCell>
                  <TableCell>{row.creditDate}</TableCell>
                  <TableCell>{row.creditParticular}</TableCell>
                  <TableCell align="right">{row.credit}</TableCell>
                </TableRow>
              ))}
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell></TableCell>
                <TableCell>
                  {balance.type === "debit" ? "By Balance" : ""}
                </TableCell>
                <TableCell align="right">
                  {balance.type === "debit" ? balance.amount : ""}
                </TableCell>
                <TableCell></TableCell>
                <TableCell>
                  {balance.type === "credit" ? "By Balance" : ""}
                </TableCell>
                <TableCell align="right">
                  {balance.type === "credit" ? balance.amount : ""}
                </TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell align="right" className="font-bold">
                  {totalDebit}
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell align="right" className="font-bold">
                  {totalCredit}
                </TableCell>
              </TableRow>
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
