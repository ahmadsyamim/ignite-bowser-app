import * as React from "react";

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current && navigationRef.current.navigate(name, params);
}

export function dispatch(action) {
  navigationRef.current && navigationRef.current.dispatch(action);
}

export function replace(name) {
  navigationRef.current && navigationRef.current.replace(name);
}
