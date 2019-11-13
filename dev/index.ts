import "ui/index.less";
import app from "./App";
import { createApp } from "vue3";
import { Input } from "ui";

createApp()
  .use(Input as any)
  .mount(app as any, "#app");
