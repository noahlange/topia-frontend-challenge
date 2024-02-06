import { Grid, TextField } from "@material-ui/core";
import { createContext } from "react";

/**
 * It's unlikely that context is the best way to expose this information to other parts of the app,
 * but it's not the _worst_ way.
 */
export const PositionContext = createContext({
  x: 800,
  y: 400,
  width: window.innerWidth,
  height: window.innerHeight,
});

export default function PositionForm(props) {
  const onChange = (e) =>
    props.onChange({ ...props.value, [e.target.id]: e.target.valueAsNumber });

  return (
    <Grid>
      <Grid>
        <TextField
          label="x"
          id="x"
          margin="normal"
          type="number"
          value={props.value.x}
          onChange={onChange}
        />
        <TextField
          label="y"
          id="y"
          margin="normal"
          type="number"
          value={props.value.y}
          onChange={onChange}
        />
      </Grid>
      <Grid>
        <TextField
          label="Width"
          id="w"
          type="number"
          margin="normal"
          value={props.value.w}
          onChange={onChange}
        />
        <TextField
          label="Height"
          id="h"
          type="number"
          margin="normal"
          value={props.value.h}
          onChange={onChange}
        />
      </Grid>
    </Grid>
  );
}
