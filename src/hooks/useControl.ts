import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../redux/redux.hooks";

import {
  showSnackbar as _showSnackbar,
  hideSnackbar as _hideSnackbar,
  startLoading as _startLoading,
  stopLoading as _stopLoading,
} from "../redux/slices/control.slice";
import { AppDispatch, RootState } from "../redux/store";

const useControl = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const controlState = useAppSelector((state: RootState) => state.control);

  const { snack, loading } = controlState;

  const showSnackbar = useCallback(
    (text: string, type = "success"): any =>
      dispatch(_showSnackbar({ text, type })),
    [dispatch]
  );

  const hideSnackbar = useCallback(
    (): any => dispatch(_hideSnackbar(controlState)),
    [dispatch]
  );

  const startLoading = useCallback(
    (): any => dispatch(_startLoading(controlState)),
    [dispatch]
  );

  const stopLoading = useCallback(
    (): any => dispatch(_stopLoading(controlState)),
    [dispatch]
  );

  return {
    snack,
    loading,
    showSnackbar,
    hideSnackbar,
    startLoading,
    stopLoading,
  };
};

export default useControl;
