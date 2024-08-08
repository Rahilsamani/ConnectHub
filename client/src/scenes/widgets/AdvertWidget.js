import { Typography, useTheme } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <Typography color={dark} variant="h5" fontWeight="500" textAlign="center">
        Join Millions in Mecca, Uniting in Faith.
      </Typography>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="http://localhost:3001/assets/kaaba.jpg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <Typography color={main}>Mecca, Saudi Arabia</Typography>
      <Typography color={medium} m="0.5rem 0">
        Set forth on the sacred journey of Hajj, where faith and unity converge.
        Experience profound devotion and renewal like never before. Embrace the
        transformative power of Mecca.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
