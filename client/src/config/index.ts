import { type FormControl } from "../types";

export const todoFormControls: FormControl[] = [
  {
    name: "name",
    label: "Name",
    componentType: "input",
    placeholder: "Enter your name",
    type: "text",
  },
  {
    name: "description",
    label: "Description",
    componentType: "textarea",
    placeholder: "Write description...",
  },
  {
    name: "dueDate",
    label: "Due Date",
    componentType: "input",
    type: "datetime-local",
  },
  {
    name: "status",
    label: "Status",
    componentType: "select",
    options: [
      { label: "Done", value: "done" },
      { label: "Upcoming", value: "upcoming" },
    ],
    placeholder: "Select status",
  },
];