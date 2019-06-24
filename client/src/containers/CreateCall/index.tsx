import React, { createRef, useState } from "react";

import { useTheme, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";

import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { useStyles } from "./styles";

import Autocomplete from "../../components/Autocomplete";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder"
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const CreateCall: React.FC = (): any => {
  const classes = useStyles();
  const pond = createRef();
  const theme = useTheme();
  const [files, setFiles] = useState([]);
  const [personName, setPersonName] = useState([]);

  const handleInit: Function = () => {
    console.log("FilePond instance has initialised", pond);
  };

  const handleChange = (event: any) => {
    setPersonName(event.target.value);
  };

  const getStyles = (name: string, personName: string[], theme: Theme) => {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium
    };
  };

  return (
    <>
      <div className={classes.root}>
        <Container component="main" maxWidth="md">
          <Typography component="h1" variant="h3">
            Create call
          </Typography>

          <div className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="text"
              autoComplete="off"
              autoFocus
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="description"
              label="Description"
              name="text"
              autoComplete="off"
              multiline
              rows="4"
            />

            <FilePond
              ref={pond}
              files={files}
              allowMultiple={true}
              maxFiles={3}
              server="/api"
              oninit={() => handleInit()}
              onupdatefiles={(fileItems: any) => {
                setFiles(fileItems.map((fileItem: any) => fileItem.file));
              }}
            />

            <InputLabel htmlFor="select-multiple-chip">
              Select category
            </InputLabel>
            <Select
              fullWidth
              multiple
              value={personName}
              onChange={handleChange}
              input={<Input id="select-multiple-chip" />}
              renderValue={selected => (
                <div className={classes.chips}>
                  {(selected as string[]).map(value => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {names.map(name => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, personName, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>

            <Autocomplete value="text" handleChange={handleChange} />
          </div>
        </Container>
      </div>
    </>
  );
};

export default CreateCall;
