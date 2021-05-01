import path from "path"
import { defineConfig } from "vite"
import reactRefresh from "@vitejs/plugin-react-refresh"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  alias: [
    {
      find: "~",
      replacement: path.resolve(path.resolve(__dirname), "src"),
    },
  ],
})
