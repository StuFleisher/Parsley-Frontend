import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./TagCapsule.scss"


type TagCapsuleProps = {
  tag: Tag;
};


function TagCapsule({ tag }: TagCapsuleProps) {
  return (
    <Box className="Tag">
      <Typography
        component={Link}
        className="Tag-name"
        to={`/tags/${tag.name}`}
      >
        {tag.name}
      </Typography>
    </Box>
  );
}

export default TagCapsule;