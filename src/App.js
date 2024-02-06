import React, { useEffect, useState } from "react";
import {
  Button,
  Backdrop,
  Modal,
  Grid,
  Box,
  Container,
  Typography,
  Fade,
} from "@material-ui/core";

import { PositionForm, UserList, PositionContext } from "./components";
import { listUsersInView, USER_LIST, useStyles } from "./utils";

export default function App() {
  const classes = useStyles();
  const [usersInView, setUsersInView] = useState([]);
  const [form, setForm] = useState({
    x: 800,
    y: 400,
    w: window.innerWidth,
    h: window.innerHeight,
    isOpen: false,
  });

  // this is a little cutesy — would keep the position info and modal state separate IRL
  const onToggleForm = (isOpen = !form.isOpen) => setForm({ ...form, isOpen });

  // TODO: Create a Modal component with inputs for position and screen size (screen size should default to actual window width and height but be editable).
  // CTA in Modal should close modal, call listUsersInView with updated values, and update usersInView
  // Add a list of the users in view in the render statement below
  useEffect(() => {
    const users = Object.values(USER_LIST);
    const ids = listUsersInView(users, form.x, form.y, form.w, form.h);
    setUsersInView(users.filter((user) => ids.includes(user.id)));
  }, [form.x, form.y, form.w, form.h, form.isOpen]);

  return (
    <div className="App">
      <Container maxWidth="md" className={classes.container}>
        <Modal
          aria-labelledby="position-form-title"
          aria-describedby="position-form-desc"
          className={classes.modal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{ timeout: 250 }}
          open={form.isOpen}
          onClose={() => onToggleForm(false)}
        >
          <Fade in={form.isOpen}>
            <Grid className={classes.paper}>
              <h3 id="position-form-title">Update User Position</h3>
              <Typography variant="body1" id="position-form-desc">
                Set or update screen dimensions and user position.
              </Typography>
              <PositionForm value={form} onChange={setForm} />
              <Button
                id="position-form-dismiss"
                color="primary"
                onClick={() => onToggleForm(false)}
              >
                Done
              </Button>
            </Grid>
          </Fade>
        </Modal>

        <Grid container direction="column">
          <Grid item>
            {usersInView.length === 0 && (
              <Box my={4}>
                <Typography component="p" gutterBottom>
                  There are currently no users within view.
                </Typography>
              </Box>
            )}
            <PositionContext.Provider value={form}>
              <UserList users={usersInView} />
            </PositionContext.Provider>
          </Grid>
          <Button
            className={classes.button}
            size="large"
            variant="contained"
            color="primary"
            onClick={() => onToggleForm()}
          >
            Create User List
          </Button>
        </Grid>
      </Container>
    </div>
  );
}
