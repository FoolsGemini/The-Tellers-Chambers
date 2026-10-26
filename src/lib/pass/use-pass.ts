import { useEffect, useState } from "react";
import { getPassStatus } from "./pass.functions";

export type PassState = {
  ready: boolean;
  open: boolean;
  configured: boolean;
};

export function usePass(): PassState {
  const [state, setState] = useState<PassState>({ ready: false, open: true, configured: false });

  useEffect(() => {
    let live = true;
    getPassStatus()
      .then((result) => {
        if (!live) return;
        const open = result.open;
        try {
          sessionStorage.setItem("veil.pass.open", open ? "1" : "0");
        } catch {
          /* private mode */
        }
        setState({ ready: true, open, configured: result.configured });
      })
      .catch(() => {
        if (live) setState({ ready: true, open: true, configured: false });
      });
    return () => {
      live = false;
    };
  }, []);

  return state;
}
