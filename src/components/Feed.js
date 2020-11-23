import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { CardHeader } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    maxHeight: 800,
    marginBottom: 10,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },

  avatar: {
    backgroundColor: red[500],
  },
  action: {
    fontSize: "1rem",
  },
  feed: {
    textAlign: "center",
  },
}));

const Feed = ({ user }) => {
  const [posts, setPosts] = useState();

  useEffect(() => {
    db.collection("posts")
      .get()
      .then((res) => {
        setPosts(res.docs.map((p) => p.data()));
      });
  }, []);

  const classes = useStyles();

  return (
    <Box
      style={{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        display: "flex",
      }}
    >
      <h1 className={classes.feed}>Feed</h1>
      {posts ? (
        posts.map((p, i) => (
          <Card className={classes.root} key={i}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  {p.userName[0].toUpperCase()}
                </Avatar>
              }
              action={
                <Typography
                  className={classes.action}
                  color="textSecondary"
                  component="p"
                >
                  Exercise: {p.exercise}
                </Typography>
              }
              title={p.userName}
              subheader="September 14, 2016"
            />
            <CardMedia
              className={classes.media}
              image={p.video}
              title="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {p.caption}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <></>
      )}
      {/* </div> */}
    </Box>
  );
};

export default Feed;
