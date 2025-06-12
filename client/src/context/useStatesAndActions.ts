import useAPIServices, {
  type UseTodoApiState,
  type UseTodoApiActions,
} from "./useAPIServices";

import { useToast } from "../hooks";

interface ExtendedTodoApiState extends UseTodoApiState {
  success: (msg: string) => void;
  error: (msg: string) => void;
}

const useStatesAndActions = (): [ExtendedTodoApiState, UseTodoApiActions] => {
  const [apiState, apiActions] = useAPIServices();
  const { success, error } = useToast();

  const state = { success, error, ...apiState };
  const action = { ...apiActions };

  return [state, action];
};

export default useStatesAndActions;
