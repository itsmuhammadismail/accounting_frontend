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

function createData(assets, creditAmount, libabilities, liabilitiesAmount) {
  return { assets, creditAmount, libabilities, liabilitiesAmount };
}

export default function BalanceSheetTable({ date }) {
  const [rows, setRows] = useState(null);
  const [totalAssets, setTotalAssets] = useState(0);
  const [totalLiabilities, setTotalLiabilities] = useState(0);

  const fetchData = async () => {
    const res = await Axios.fetch({
      url: "journal/balance",
      params: { date: date },
    });

    if (res && res.status === 200) {
      console.log(res.data);

      setTotalAssets(res.data.totar_asset);
      setTotalLiabilities(res.data.total_liability);

      let length = res.data.assets.length;
      if (res.data.assets.length < res.data.liabilities.length)
        length = res.data.liabilities.length;

      let data = [];

      for (let i = 0; i < length; i++) {
        try {
          data.push(
            createData(
              res.data.assets[i].account,
              res.data.assets[i].amount,
              res.data.liabilities[i].account,
              res.data.liabilities[i].amount
            )
          );
        } catch (e) {
          if (res.data.assets.length < res.data.liabilities.length) {
            data.push(
              createData(
                "",
                "",
                res.data.liabilities[i].account,
                res.data.liabilities[i].amount
              )
            );
          } else {
            data.push(
              createData(
                res.data.assets[i].account,
                res.data.assets[i].amount,
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
  }, [date]);
  return (
    <>
      {rows ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Assets</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Liabilities</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.asset}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.assets}</TableCell>
                  <TableCell align="right">{row.creditAmount}</TableCell>
                  <TableCell>{row.libabilities}</TableCell>
                  <TableCell align="right">{row.liabilitiesAmount}</TableCell>
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
