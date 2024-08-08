import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box backgroundColor={theme.palette.background.default} pb="40px">
      <Box p="1rem 6%" textAlign="center">
        <img
          src="../assets/logo.png"
          height={100}
          style={{ userSelect: "none" }}
          alt="Brand-Logo"
        />
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="1rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Connect with the Ummah, Insha'Allah.
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
