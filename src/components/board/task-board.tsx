"use client";

import {
  Button,
  ColumnsCards,
  FormCreate,
  Modal,
  NavBar,
  RowItems,
  Sheet,
  SingleTask,
} from "@/components";
import {
  closeTask,
  setCounter,
  setIsStart,
  setIsStop,
  useGetTasksQuery,
  usePutLogMutation,
} from "@/utils/libs/redux";
import type { Columns } from "@/utils/constant/tasks";
import { useAppDispatch, useAppSelector, useBoard } from "@/utils/hooks";

export function TaskBoard() {
  const dispatch = useAppDispatch();
  const { isLoading } = useGetTasksQuery(null);
  const { tasks, openTask, onlyTask } = useBoard();
  const { isStop, counter, taskId } = useAppSelector(
    (state) => state.timerSlice,
  );
  const [submitLog, { isLoading: loadLog }] = usePutLogMutation();

  const columns: Columns[] = ["Backlog", "In Progress", "Test", "Done"];

  const handleClose = () => {
    dispatch(closeTask());
  };

  const handleLog = async () => {
    try {
      await submitLog({ counter, id: taskId });
      dispatch(setIsStart(false));
      dispatch(setCounter(0));
      window.localStorage.removeItem("timer");
      dispatch(setIsStop(false));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelStop = () => {
    dispatch(setIsStop(false));
  };

  return (
    <>
      <div className="flex h-screen flex-col justify-between">
        <NavBar />

        <section className="flex flex-grow justify-between overflow-auto px-5">
          {columns.map((column, index) => (
            <ColumnsCards
              key={index}
              tasks={tasks}
              column={column}
              loading={isLoading}
            />
          ))}
        </section>
      </div>

      <FormCreate />

      <Modal
        isOpen={isStop}
        title="Stop counter"
        close={handleCancelStop}
        size="sm"
        hideClose
      >
        <p>confirm to stop the counter and save the progress in the task?</p>

        <RowItems className="mt-3">
          <Button variant="outline" onClick={handleCancelStop}>
            Cancel
          </Button>
          <Button
            variant="secondary"
            onClick={handleLog}
            loader={loadLog}
            disabled={loadLog}
          >
            Confirm
          </Button>
        </RowItems>
      </Modal>

      <Sheet hidden={openTask} size="xl" close={handleClose}>
        {onlyTask && <SingleTask task={onlyTask} />}
      </Sheet>
    </>
  );
}
