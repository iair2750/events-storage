export const useEnvValue = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`config error - missing env.${key}`);
  }
  return value;
};
