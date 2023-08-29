import {
  ThemeContextType,
  paginationtypes,
  taskfiltertypes,
  tasksLists
} from "../typescript/types";
import { Box, FormControl, Select, MenuItem, Pagination } from "@mui/material";
import useStyles from "../mui/useStyles";
import Task from "../components/Task";
import MainButton from "../components/MainButton";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useState, useEffect, useContext } from "react";
import TaskModal from "../components/TaskModal";
import taskServices from "../services/taskServices";
import { CreateAuthContext } from "../contextApi/useAuthContext";
import Navbar from "../components/Navbar";

const Home: React.FC = () => {
  const [tasksLists, setTasksLists] = useState<tasksLists[]>();
  const [taskModal, setTaskModal] = useState<boolean>(false);
  const [pageInfo, setPageInfo] = useState<paginationtypes>({
    pages: 1,
    limit: 10,
    total: 10
  });
  const [taskFilters, setTaskFilters] = useState<taskfiltertypes>({
    make: "All",
    pageNum: 1
  });
  const { updateList, search } = useContext(CreateAuthContext) as ThemeContextType;
  const classes = useStyles();

  const getTasks = async (controller: any) => {
    const response = await taskServices.getAllTask(taskFilters, search, controller);
    if (response?.status === 200) {
      setTasksLists(response?.data?.data);
      setPageInfo(response?.data?.pagination);
      setTaskModal(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    getTasks(controller.signal);
    return () => {
      controller.abort();
    };
  }, [updateList, taskFilters, search]);

  return (
    <>
      <Navbar />
      <Box sx={{ maxWidth: { xs: "100vw", sm: "70vw" }, margin: "auto" }}>
        <Box className={classes.taskTop}>
          <Box>
            <FormControl className={classes.filterButton}>
              <Select
                value={taskFilters?.make}
                IconComponent={() => <FilterAltIcon />}
                onChange={(e) => setTaskFilters({ ...taskFilters, make: e.target.value })}>
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="AUDI">AUDI</MenuItem>
                <MenuItem value="BMW">BMW</MenuItem>
                <MenuItem value="VAUXHAL">VAUXHAL</MenuItem>
                <MenuItem value="MERCEDES">MERCEDES</MenuItem>
                <MenuItem value="PEUGEOT">PEUGEOT</MenuItem>
                <MenuItem value="RENAULT">RENAULT</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <MainButton
            text="Create New"
            variant="contained"
            color="primary"
            onClick={() => setTaskModal(!taskModal)}
          />
        </Box>
        {tasksLists?.length ? (
          <Box className={classes.taskContainer}>
            {tasksLists?.map((task: tasksLists, index: number) => (
              <Task task={task} key={index} />
            ))}
          </Box>
        ) : (
          <h1 style={{ textAlign: "center" }}>No Task to Display</h1>
        )}
        {tasksLists?.length ? (
          <Box className={classes.pagination}>
            <Pagination
              count={pageInfo?.pages}
              color="primary"
              onChange={(e, pagenumber) => setTaskFilters({ ...taskFilters, pageNum: pagenumber })}
            />
          </Box>
        ) : (
          ""
        )}
        <TaskModal openModal={taskModal} setOpenModal={setTaskModal} title="Create New Task" />
      </Box>
    </>
  );
};

export default Home;
