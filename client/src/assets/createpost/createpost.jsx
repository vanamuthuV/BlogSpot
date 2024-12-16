import React, { useState, useRef } from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  Paper,
  Typography,
  Box,
  Chip,
  Container,
  Grid,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ImageComponent from "../../../utils/ImageComponent";

const CREATE_POST = "/post";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const StyledReactQuill = styled(ReactQuill)({
  "& .ql-toolbar": {
    backgroundColor: "rgb(249 115 22)",
    borderColor: "rgb(249 115 22)",
    "& .ql-picker": {
      color: "white",
    },
    "& .ql-stroke": {
      stroke: "white",
    },
    "& .ql-fill": {
      fill: "white",
    },
    "& button:hover .ql-stroke": {
      stroke: "#f1f1f1",
    },
    "& button:hover .ql-fill": {
      fill: "#f1f1f1",
    },
  },
  "& .ql-container": {
    minHeight: "200px",
    fontSize: "16px",
  },
});

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    ["link", "image", "video"],
    ["clean"],
    [{ align: [] }],
    ["code-block"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "color",
  "background",
  "link",
  "image",
  "video",
  "align",
  "code-block",
];

const EnhancedCreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [summary, setSummary] = useState("");
  const [postType, setPostType] = useState("public");
  const [comments, setComments] = useState(true);
  const [currentMedia, setCurrentMedia] = useState(null);
  const [currentTag, setCurrentTag] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const quillRef = useRef(null);
  const mediaRef = useRef(null);

  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64String = await readFileAsDataURL(file);
      setCurrentMedia(base64String);
    }
  };

  const handleAddTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = new FormData();
    data.set("title", title);
    data.set("content", content);
    data.set("category", category);
    data.set("tags", tags.join(","));
    data.set("summary", summary);
    data.set("posttype", postType);
    data.set("comments", comments);

    if (currentMedia) {
      data.set("media", currentMedia);
    } else {
      console.error("No file selected");
    }

    try {
      const response = await axios.post(CREATE_POST, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log(response?.data?.success);
      console.log(response?.data?.base);
      console.log(response?.data?.Base);
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error);
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Create Your Post
        </Typography>
        <Paper elevation={3} sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  variant="outlined"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <StyledReactQuill
                  ref={quillRef}
                  value={content}
                  onChange={setContent}
                  modules={modules}
                  formats={formats}
                  placeholder="Write your post content here..."
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Category"
                  variant="outlined"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Post Type</InputLabel>
                  <Select
                    value={postType}
                    onChange={(e) => setPostType(e.target.value)}
                    label="Post Type"
                  >
                    <MenuItem value="public">Public</MenuItem>
                    <MenuItem value="private">Private</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                  {tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      onDelete={() => handleRemoveTag(tag)}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <TextField
                    label="Add a tag"
                    variant="outlined"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    fullWidth
                  />
                  <Button variant="contained" onClick={handleAddTag}>
                    Add Tag
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Summary"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={comments}
                      onChange={(e) => setComments(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Enable Comments"
                />
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    sx={{
                      backgroundColor: "rgb(249 115 22)",
                      "&:hover": {
                        backgroundColor: "rgb(234 88 12)",
                      },
                    }}
                  >
                    Upload Thumbnail
                    <VisuallyHiddenInput
                      type="file"
                      onChange={handleImageUpload}
                      ref={mediaRef}
                    />
                  </Button>
                  {currentMedia && (
                    <ImageComponent
                      features="min-h-52 min-w-52 max-h-52 max-w-52"
                      base64String={currentMedia}
                    />
                  )}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  disabled={isLoading}
                  sx={{
                    mt: 2,
                    backgroundColor: "rgb(249 115 22)",
                    "&:hover": {
                      backgroundColor: "rgb(234 88 12)",
                    },
                  }}
                >
                  {isLoading ? <CircularProgress size={24} /> : "Create Post"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default EnhancedCreatePost;
