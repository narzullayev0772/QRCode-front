import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { IconButton, List, ListItemButton } from "@mui/material";
import { useContext, useState } from "react";
import DialogContext from "../contexts/dialog.context";
import moment from "moment/moment";
import { MdMoreVert } from "react-icons/md";
import AxiosContext from "../contexts/axios.context";
import Mydialog from "./mydialog";

export default function RecipeReviewCard({ post, setReload }) {
  const { openDialog, closeDialog } = useContext(DialogContext);
  const [whiteSpace, setWhiteSpace] = useState("nowrap");
  const { Request } = useContext(AxiosContext);

  const deletePost = async () => {
    closeDialog();
    openDialog(
      <Mydialog
        title={"Ishonchingiz komilmi?"}
        onYes={async () => {
          await Request("/reception", "DELETE");
          setReload((prev) => prev + 1);
          closeDialog();
        }}
        onNo={() => {
          closeDialog();
        }}
      />
    );
  };
  return (
    <Card sx={{ maxWidth: 300, width: "100%" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {post.user?.name[0]}
          </Avatar>
        }
        title={post.user?.name}
        subheader={moment(post.reception_time).format("HH:mm - MMMM DD")}
        action={
          <IconButton
            onClick={() => {
              openDialog(
                <List>
                  <ListItemButton onClick={deletePost}>
                    <Typography color={"error"}>O'chirish</Typography>
                  </ListItemButton>
                </List>
              );
            }}
          >
            <MdMoreVert />
          </IconButton>
        }
      />
      <CardMedia
        component="img"
        image={post.content}
        alt="blob image"
        onClick={() => {
          openDialog(
            <img
              src={post.content}
              style={{ width: "100%", height: "100%" }}
              alt={"new window"}
            />
          );
        }}
      />
      <CardContent>
        <Typography
          variant="body2"
          sx={{
            overflow: "hidden",
            whiteSpace: { whiteSpace },
            textOverflow: "ellipsis",
            transition: "all 0.5s ease",
          }}
          onClick={() => {
            setWhiteSpace(whiteSpace === "nowrap" ? "normal" : "nowrap");
          }}
        >
          {post.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
