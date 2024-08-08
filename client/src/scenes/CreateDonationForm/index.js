import { Box, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

const CreateDonation = ({ setCreate }) => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box backgroundColor={theme.palette.background.default} pb="40px">
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="1rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Form setCreate={setCreate} />
      </Box>
    </Box>
  );
};

export default CreateDonation;
