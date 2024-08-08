import { useTypewriter, Cursor } from "react-simple-typewriter";
import { Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import "./TypeWriter.css";

const TypeWriter = () => {
  const [text] = useTypewriter({
    words: [
      "The Messenger of Allah (peace be upon him) said, 'He who builds a mosque for Allah, Allah will build for him a house like it in Paradise.'",
      "Charity extinguishes sins as water extinguishes fire.",
      "Save yourself from hellfire by giving even half a date-fruit in charity.",
      "Giving charity provides shade on the Day of Judgment",
      "The Prophet (peace be upon him), said: “Give charity without delay, for it stands in the way of calamity.”",
    ],
    loop: {},
    typeSpeed: 120,
    delaySpeed: 10,
    deleteSpeed: 40,
  });

  const { palette } = useTheme();
  const dark = palette.logo.dark;
  const light = palette.logo.light;
  const mode = useSelector((state) => state.mode);

  return (
    <div className="typewriterArea">
      <div style={{ width: "80%" }}>
        <Typography
          sx={{ m: "20px", textAlign: "center" }}
          variant="p"
          color={mode === "light" ? dark : light}
        >
          <span>{text}</span>
          <span>
            <Cursor />
          </span>
        </Typography>
      </div>
    </div>
  );
};

export default TypeWriter;
