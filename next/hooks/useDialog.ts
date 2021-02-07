import { useEffect, useRef } from "react";
import { Dialog } from "../components/shared/utilities/dialog/dialog";
export function useDialog(element: JSX.Element) {
  console.log("call use dialog");
  return Dialog({ children: element });
}
