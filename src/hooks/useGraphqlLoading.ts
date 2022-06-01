import { useEffect, useState } from "react";

//Checks loading states of multiple mutations on the same component
const useGraphQlLoading = (dependencies: boolean[]) => {
  const [pendingRequest, setPendingRequest] = useState<boolean>(false);
  useEffect(() => {
    //Global Loading State for Registration :
    dependencies.some(d => d)
      ? setPendingRequest(true)
      : setPendingRequest(false);
  }, dependencies);
  return pendingRequest;
};

export default useGraphQlLoading;
