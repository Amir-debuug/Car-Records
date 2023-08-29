import { Box, FormControl, FormLabel, Typography } from "@mui/material";
import { ThemeContextType, props } from "../typescript/types";
import useStyles from "../mui/useStyles";
import MainButton from "./MainButton";
import TaskModal from "./TaskModal";
import { useState, useContext } from "react";
import taskServices from "../services/taskServices";
import { CreateAuthContext } from "../contextApi/useAuthContext";
import { toast } from "react-toastify";

const Task: React.FC<props> = ({ task }) => {
  const { updateList, setUpdateList } = useContext(CreateAuthContext) as ThemeContextType;
  const [taskModal, setTaskModal] = useState<boolean>(false);
  const classes = useStyles();

  const deleteTask: () => Promise<void> = async () => {
    const response: any = await taskServices.deleteTask(task?._id);
    if (response?.status < 300) {
      toast.success("Task Deleted Successfully");
      setUpdateList(!updateList);
    }
    if (response?.response?.status >= 400) {
      toast.error("Something Went Wrong!");
    }
  };

  return (
    <Box className={classes.taskWrapper}>
      <FormControl className={classes.taskheading}>
        <FormLabel>Name</FormLabel>
        <Typography variant="h6" fontWeight="500">
          {task?.name}
        </Typography>
      </FormControl>
      <FormControl className={classes.taskheading}>
        <FormLabel>Make</FormLabel>
        <Typography variant="h6" fontWeight="500">
          {task?.make}
        </Typography>
      </FormControl>
      <FormControl className={classes.taskheading}>
        <FormLabel>Color</FormLabel>
        <Typography variant="h6" fontWeight="500">
          {task?.color}
        </Typography>
      </FormControl>
      <FormControl className={classes.taskheading}>
        {task?.code && (
          <>
            <FormLabel>Code</FormLabel>
            <Typography variant="h6" fontWeight="500">
              {task?.code}
            </Typography>
          </>
        )}
      </FormControl>
      <Box className={classes.taskCloseIcon}>
        <MainButton
          text="Edit"
          color="success"
          variant="contained"
          onClick={() => setTaskModal(!taskModal)}
        />
        <MainButton text="Delete" variant="contained" color="secondary" onClick={deleteTask} />
      </Box>

      <TaskModal task={task} openModal={taskModal} setOpenModal={setTaskModal} title="Edit Task" />
    </Box>
  );
};

export default Task;
