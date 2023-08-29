import {
  Box,
  FormControl,
  FormLabel,
  IconButton,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useContext, useState } from "react";
import { ThemeContextType, modalProps, tasksLists } from "../typescript/types";
import useStyles from "../mui/useStyles";
import MainButton from "./MainButton";
import CloseIcon from "@mui/icons-material/Close";
import taskServices from "../services/taskServices";
import { CreateAuthContext } from "../contextApi/useAuthContext";
import { toast } from "react-toastify";

const TaskModal: React.FC<modalProps> = ({ openModal, setOpenModal, title, task }) => {
  const { updateList, setUpdateList } = useContext(CreateAuthContext) as ThemeContextType;
  const [render, setRender] = useState<number>(1);
  const [createTask, setCreateTask] = useState<tasksLists>({
    name: task?.name || "",
    code: task?.code || "",
    color: task?.color || "BLUE",
    make: task?.make || "AUDI"
  });

  const handleInputValue = (event: any) => {
    const { name, value } = event.target;

    setCreateTask({ ...createTask, [name]: value });
  };

  const createNewTask = async () => {
    if (!createTask.name) {
      toast.error("Name required");
      return;
    }

    const response: any = await taskServices.createNewTask(createTask);
    if (response?.status < 300) {
      toast.success("Task Successfully Created");
      setRender(1);
      setCreateTask({
        name: task?.name || "",
        code: task?.code || "",
        color: task?.color || "BLUE",
        make: task?.make || "AUDI"
      });
      setUpdateList(!updateList);
      setOpenModal(false);
    }

    if (response?.response?.data?.error === true) {
      toast.error(response?.response?.data?.message);
    }
  };

  const updateTask = async () => {
    if (!createTask.name) {
      toast.error("Name required");
      return;
    }

    const response: any = await taskServices.updateTask(createTask, task?._id);
    if (response?.status < 300) {
      toast.success("Task Successfully Updated");
      setRender(1);
      setUpdateList(!updateList);
      setOpenModal(false);
    }

    if (response?.response?.data?.error === true) {
      toast.error(response?.response?.data?.message);
    }
  };

  const classes = useStyles();

  return (
    <Modal open={openModal} className={classes.modalContainer}>
      <Box className={classes.modalWrapper}>
        <Typography variant="h5" fontWeight="700">
          {title}
        </Typography>
        <IconButton disabled={render === 1} onClick={() => setRender(render - 1)}>
          <ArrowBackIcon />
        </IconButton>
        <Box>
          {render === 1 && (
            <>
              <FormControl className={classes.modalStatus}>
                <FormLabel className={classes.modalheading}>Name</FormLabel>
                <TextField
                  type="text"
                  placeholder="Name"
                  size="small"
                  name="name"
                  color="secondary"
                  defaultValue={task?.name}
                  className={classes.modalInput}
                  onChange={handleInputValue}
                />
              </FormControl>

              <FormControl className={classes.modalStatus}>
                <FormLabel className={classes.modalheading}>Make</FormLabel>
                <Select
                  defaultValue={task?.make || "AUDI"}
                  name="make"
                  color="secondary"
                  onChange={handleInputValue}>
                  <MenuItem value="AUDI">AUDI</MenuItem>
                  <MenuItem value="BMW">BMW</MenuItem>
                  <MenuItem value="VAUXHAL">VAUXHAL</MenuItem>
                  <MenuItem value="MERCEDES">MERCEDES</MenuItem>
                  <MenuItem value="PEUGEOT">PEUGEOT</MenuItem>
                  <MenuItem value="RENAULT">RENAULT</MenuItem>
                </Select>
              </FormControl>
            </>
          )}
          {render === 2 && (
            <FormControl className={classes.modalStatus}>
              <FormLabel className={classes.modalheading}>Color</FormLabel>
              <Select
                defaultValue={task?.color || "BLUE"}
                name="color"
                color="secondary"
                onChange={handleInputValue}>
                <MenuItem value="BLUE">BLUE</MenuItem>
                <MenuItem value="RED">RED</MenuItem>
                <MenuItem value="BLACK">BLACK</MenuItem>
                <MenuItem value="ORANGE">ORANGE</MenuItem>
              </Select>
            </FormControl>
          )}

          {render === 3 && (
            <FormControl className={classes.modalStatus}>
              <FormLabel className={classes.modalheading}>Code</FormLabel>
              <TextField
                type="text"
                placeholder="Code"
                name="code"
                size="small"
                color="secondary"
                defaultValue={task?.code}
                className={classes.modalInput}
                onChange={handleInputValue}
              />
            </FormControl>
          )}
          {render === 4 && (
            <FormControl className={classes.modalStatus}>
              <FormLabel className={classes.modalheading}>Generated Text</FormLabel>
              <Typography fontSize="12px" mt={2}>{`I have a ${
                createTask?.make || task?.make
              } and the color is ${createTask?.color || task?.color}`}</Typography>
              {(createTask?.color === "RED" || task?.color === "RED") && (
                <Typography fontSize="12px" mt={2}>
                  THE CAR IS RED! NICE!!
                </Typography>
              )}
              <Typography fontSize="12px" mt={2}>{`REF : ${
                createTask?.code || task?.code
              }`}</Typography>
            </FormControl>
          )}
        </Box>
        <Box className={classes.modalbtn}>
          {render === 4 ? (
            <MainButton
              variant="contained"
              color="secondary"
              text={task ? "Save" : "Create Task"}
              fullWidth={true}
              onClick={task ? updateTask : createNewTask}
            />
          ) : (
            <MainButton
              color="secondary"
              variant="contained"
              fullWidth={true}
              text="Next"
              onClick={() => setRender(render + 1)}
            />
          )}
        </Box>

        <div className={classes.modalClose} onClick={() => setOpenModal(false)}>
          <CloseIcon />
        </div>
      </Box>
    </Modal>
  );
};

export default TaskModal;
