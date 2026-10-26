import { createServerFn } from "@tanstack/react-start";

export const getPassStatus = createServerFn({ method: "GET" }).handler(async () => {
  const { readPass } = await import("./pass.server");
  return readPass();
});

export const beginCheckout = createServerFn({ method: "POST" }).handler(async () => {
  const { startCheckout } = await import("./pass.server");
  return startCheckout();
});

export const confirmCheckout = createServerFn({ method: "POST" })
  .validator((data: { sessionId: string }) => data)
  .handler(async ({ data }) => {
    const { confirmCheckout: confirm } = await import("./pass.server");
    return confirm(data.sessionId);
  });

export const restorePass = createServerFn({ method: "POST" })
  .validator((data: { email: string }) => data)
  .handler(async ({ data }) => {
    const { restorePass: restore } = await import("./pass.server");
    return restore(data.email);
  });
