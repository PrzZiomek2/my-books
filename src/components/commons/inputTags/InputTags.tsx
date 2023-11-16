import { FC, useRef } from "react";

import Cancel from "@mui/icons-material/Cancel";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

interface TagCustomProps{
  data: string;
  handleDelete?: (value: string) => void;
}

export const TagCustom = ({ data, handleDelete }: TagCustomProps ) => {
  return (
    <Box 
      sx={{
        background: "#205eb4",
        height: "100%",
        display: "flex",
        padding: "0.4rem",
        margin: "10px 8px",
        justifyContent: "center",
        alignContent: "center",
        color: "#ffffff",
        borderRadius: "5px"
      }}
    >
      <Stack direction='row' gap={1} alignItems="center">
        <Typography>{data}</Typography>
        {handleDelete &&
          <Cancel
            sx={{ 
              cursor: "pointer",
              fontSize: "1rem"
            }}
            onClick={() => {
              handleDelete(data);
            }}
          />}
      </Stack>
    </Box>
  );
};


interface InputTagsProps{
  tags: string[];
  setTags: (tags: string[]) => void;
  id: string;
  label?: string; 
}

export const  InputTags: FC<InputTagsProps> = ({tags, setTags, id, label}) =>{
  const tagRef = useRef<HTMLInputElement>();

  const handleDelete = (value: string) => {
    const newtags = tags.filter((val) => val !== value);
    setTags(newtags);
  };

  return (
    <Box sx={{ 
      flexGrow: 1,
      marginTop: "6px"
      }}>
        <Box sx={{ 
              margin: "0 0.2rem 0 0", 
              display: "flex",
              flexWrap: tags?.length > 2 ? "wrap" : "nowrap"
            }}>
            {tags.map((data, index) => {
              return (
                <TagCustom 
                  data={data} 
                  handleDelete={handleDelete} 
                  key={index} 
                />
              );
            })}
          </Box>
        <TextField
          inputRef={tagRef}
          fullWidth
          {...(label ? {label} : {})}
          variant="standard" 
          className="profile_form__input" 
          placeholder="Wpisz tutaj"
          InputProps={{ id }}
        />

        <Button
          className='profile_tags-add' 
          sx={{marginTop: "12px"}}
          onClick={() => {
            if(!tagRef.current) return;
            setTags([...tags, tagRef.current!.value])
            tagRef.current.value = "";
          }} 
          variant="outlined"
        >
          Dodaj 
        </Button>
    </Box>
  );
}
