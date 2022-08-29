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

function createData(revenue, revenueAmount, expense, expenseAmount) {
  return { revenue, revenueAmount, expense, expenseAmount };
}

// const rows = [
//   createData("hello", 1, "hello", 1),
//   createData("hello", 1, "hello", 1),
//   createData("hello", 1, "hello", 1),
// ];

export default function IncomeStatementTable() {
  const [rows, setRows] = useState(null);
  const [totalAssets, setTotalAssets] = useState(0);
  const [totalLiabilities, setTotalLiabilities] = useState(0);

  const fetchData = async () => {
    const res = await Axios.fetch({
      url: "journal/income",
    });

    if (res && res.status === 200) {
      console.log(res.data);

      setTotalAssets(res.data.totar_revenue);
      setTotalLiabilities(res.data.total_expense);

      let length = res.data.revenue.length;
      if (res.data.revenue.length < res.data.expense.length)
        length = res.data.expense.length;

      let data = [];

      for (let i = 0; i < length; i++) {
        try {
          data.push(
            createData(
              res.data.revenue[i].account,
              res.data.revenue[i].amount,
              res.data.expense[i].account,
              res.data.expense[i].amount
            )
          );
        } catch (e) {
          if (res.data.revenue.length < res.data.expense.length) {
            data.push(
              createData(
                "",
                "",
                res.data.expense[i].account,
                res.data.expense[i].amount
              )
            );
          } else {
            data.push(
              createData(
                res.data.revenue[i].account,
                res.data.revenue[i].amount,
                "",
                ""
              )
            );
          }
        }
      }

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
                <TableCell>Revenue</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell>Expenses</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.asset}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.revenue}</TableCell>
                  <TableCell align="right">{row.revenueAmount}</TableCell>
                  <TableCell>{row.expense}</TableCell>
                  <TableCell align="right">{row.expenseAmount}</TableCell>
                </TableRow>
              ))}
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell></TableCell>
                <TableCell align="right" className="font-bold">
                  {totalAssets}
                </TableCell>
                <TableCell></TableCell>
                <TableCell align="right" className="font-bold">
                  {totalLiabilities}
                </TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell className="font-bold">Net Income</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell></TableCell>
                <TableCell align="right" className="font-bold">
                  {+totalAssets + +totalLiabilities}
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
