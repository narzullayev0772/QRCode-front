import { Box, Button, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import RecipeReviewCard from "../components/post";
import AxiosContext from "../contexts/axios.context";
import DialogContext from "../contexts/dialog.context";

const Reception = ({ setReload, closeDialog }) => {
  const { Request } = useContext(AxiosContext);
  const [disabled, setDisabled] = useState(true);
  return (
    <Box
      sx={{
        width: "100%",
        padding: "5%",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
      component="form"
      onSubmit={async (e) => {
        e.preventDefault();
        const formdata = new FormData(e.target);
        const json = {
          reception_time: formdata.get("reception_time"),
          description: formdata.get("description"),
        };
        await Request("/reception/register", "POST", json);
        setReload((prev) => prev + 1);
        closeDialog();
      }}
    >
      <Typography textAlign={"center"}>Ro'yxatdan o'tish</Typography>
      <TextField
        type={"datetime-local"}
        fullWidth
        size="small"
        name="reception_time"
        required
        onChange={async (e) => {
          setDisabled(false);
          const time = new Date(e.target.value);
          const { data } = await Request("/reception/check", "POST", {
            reception_time: time,
          });
          setDisabled(!data.isEmpty);
        }}
      />
      <TextField
        multiline
        rows={4}
        placeholder="Kasallik haqida"
        fullWidth
        name="description"
      />
      <Button variant="contained" type="submit" disabled={disabled}>
        Qabulga yozilish
      </Button>
    </Box>
  );
};

const Posts = () => {
  const { Request } = useContext(AxiosContext);
  const { openDialog, closeDialog } = useContext(DialogContext);
  const [posts, setPosts] = useState({});
  const [reload, setReload] = useState(0);

  useEffect(() => {
    const getPosts = async () => {
      const res = await Request("/reception", "GET");
      setPosts(res.data);
      localStorage.setItem("me", JSON.stringify(res.data.data.user));
    };
    getPosts();
  }, [reload]);

  const send_request = async () => {
    openDialog(<Reception setReload={setReload} closeDialog={closeDialog} />);
  };
  return (
    <Box
      sx={{
        display: "flex",
        gap: "2rem",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography>{posts.message}</Typography>
        {posts.message === "Siz ro'yxatdan o'tmadingiz" && (
          <Button variant="contained" onClick={send_request}>
            Ro'yxatdan o'tish
          </Button>
        )}
      </Box>
      <Box>
        {posts.message === "Siz ro'yxatdan o'tgansiz" && (
          <RecipeReviewCard
            post={{
              user: posts.data.user.user,
              content: posts.data.img,
              reception_time: posts.data.user.reception_time,
              description: posts.data.user.description,
            }}
            setReload={setReload}
          />
        )}
      </Box>
    </Box>
  );
};

export default Posts;
