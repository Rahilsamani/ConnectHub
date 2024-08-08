import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import { setDonationPosts } from "state";
import { useDispatch, useSelector } from "react-redux";

const donationPostSchema = yup.object().shape({
  name: yup.string().required("name is required"),
  description: yup.string().required("Description is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required"),
  picture: yup.string().required("Picture is required"),
});

const initialValuesDonationPost = {
  name: "",
  description: "",
  price: "",
  picture: "",
};

const Form = ({ setCreate }) => {
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const getDonationPosts = async () => {
    try {
      const response = await fetch("http://localhost:3001/donation/all", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      dispatch(setDonationPosts(data?.donations));
    } catch (err) {
      console.log(err);
      console.log("Error Occured While Fetching Donation Posts");
    }
  };

  const register = async (values, onSubmitProps) => {
    // we can send form info with image using this
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picture", values.picture.name);

    const savedUserResponse = await fetch(
      "http://localhost:3001/donation/new",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setCreate(false);
      getDonationPosts();
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesDonationPost}
      validationSchema={donationPostSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              label="name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
              name="name"
              error={Boolean(touched.name) && Boolean(errors.name)}
              helperText={touched.name && errors.name}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Description"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.description}
              name="description"
              error={
                Boolean(touched.description) && Boolean(errors.description)
              }
              helperText={touched.description && errors.description}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Price"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.price}
              name="price"
              error={Boolean(touched.price) && Boolean(errors.price)}
              helperText={touched.price && errors.price}
              sx={{ gridColumn: "span 4" }}
            />
            <Box
              gridColumn="span 4"
              border={`1px solid ${palette.neutral.medium}`}
              borderRadius="5px"
              p="1rem"
            >
              <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                onDrop={(acceptedFiles) =>
                  setFieldValue("picture", acceptedFiles[0])
                }
              >
                {({ getRootProps, getInputProps }) => (
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {!values.picture ? (
                      <p>Add Picture Here</p>
                    ) : (
                      <FlexBetween>
                        <Typography>{values.picture.name}</Typography>
                        <EditOutlinedIcon />
                      </FlexBetween>
                    )}
                  </Box>
                )}
              </Dropzone>
            </Box>
          </Box>

          {/* Buttons */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette?.logo?.light,
                color: palette.background.alt,
                "&:hover": { backgroundColor: palette?.logo?.light },
              }}
            >
              Create Donation Post
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
