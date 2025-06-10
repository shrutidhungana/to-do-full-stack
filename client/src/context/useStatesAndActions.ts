import useAPIServices, {
  type UseTodoApiState,
  type UseTodoApiActions,
} from "./useAPIServices";

const useStatesAndActions = (): [UseTodoApiState, UseTodoApiActions] => {
  const [apiState, apiActions] = useAPIServices();

  return [apiState, apiActions];
};

export default useStatesAndActions;
