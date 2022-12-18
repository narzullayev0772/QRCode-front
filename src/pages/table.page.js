import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import AxiosContext from "../contexts/axios.context";
import moment from "moment";

export default function UsersTable() {
  const { Request } = useContext(AxiosContext);
  const [rows, setRows] = useState([]);
  const me = JSON.parse(localStorage.getItem("me"));
  useEffect(() => {
    Request("/reception/all", "GET").then((res) => {
      setRows(res.data.data);
    });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Bemorlar</TableCell>
            <TableCell align="right">Index</TableCell>
            <TableCell align="right">Qabul vaqti</TableCell>
          </TableRow>
        </TableHead>
        {rows?.length > 0 && (
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:odd": {
                    backgroundColor: "#00000010",
                  },
                  "&:hover": {
                    backgroundColor: "#00000010",
                    transition: "all 0.3s ease",
                  },
                  background: me.index === row.index && "#0088cc60",
                }}
              >
                <TableCell component="th" scope="row">
                  {row.user.name}
                </TableCell>
                <TableCell align="right">
                  <Typography variant="caption">{row.index}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="caption">
                    {moment(row.reception_time).format("HH:mm - MMMM DD")}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}
