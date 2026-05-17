import cors from "cors";

app.use(
  cors({
    origin: [
      "https://gigflow-jx774rghw-aakash-2204s-projects.vercel.app",
      "http://localhost:5173"
    ],
    credentials: true,
  })
);