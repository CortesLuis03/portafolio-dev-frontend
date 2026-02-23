/* eslint-disable @typescript-eslint/no-explicit-any */
const runtimeEnv = (window as any).__ENV__;

export const API_URL =
  runtimeEnv?.VITE_API_URL || import.meta.env.VITE_API_URL;