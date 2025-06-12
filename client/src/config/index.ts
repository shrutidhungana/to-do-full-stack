import { type FormControl } from "../types";

export const todoFormControls: FormControl[] = [
  {
    name: "name",
    label: "Name",
    componentType: "input",
    placeholder: "Enter the To Do ",
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
 
];

export const filterOptions = [
  { label: "All", value: "all" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Done", value: "done" },
];