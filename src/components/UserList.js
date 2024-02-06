import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import SettingsInputAntennaIcon from "@material-ui/icons/SettingsInputAntenna";

import { useContext, useMemo } from "react";

import { Tooltip } from "@material-ui/core";
import { distance } from "../utils";
import { PositionContext } from "./PositionForm";

export default function UserList(props) {
  // React's lack of prescription re: data flow isn't ideal here — there are myriad ways we could pass distance info along with the users.
  // Context isn't ideal, but it's also not awful — this is information we could plausibly want elsewhere. attaching distance information
  // in listUsersInView would obviously also work fine, but it's unclear if mutating the user data is kosher per the spec.
  const position = useContext(PositionContext);

  const users = useMemo(() => {
    return props.users
      .map((user) => ({ ...user, distance: distance(user, position) }))
      .sort((a, b) => a.distance - b.distance);
  }, [props.users, position]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}>User</TableCell>
            <TableCell>Distance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell align="left">{user.username}</TableCell>
              <TableCell align="center">
                {user.is_broadcaster ? (
                  <Tooltip title="Broadcaster">
                    <SettingsInputAntennaIcon color="primary" />
                  </Tooltip>
                ) : (
                  <SettingsInputAntennaIcon color="disabled" />
                )}
              </TableCell>
              <TableCell>{user.distance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
