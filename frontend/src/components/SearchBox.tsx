import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: "20px",
      paddingBottom: "20px",
    },
    input: {
      width: "500px",
    },
  })
);

export default function SearchBox() {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        className={classes.input}
        variant="outlined"
        label="YouTube Search"
      />
    </form>
  );
}
