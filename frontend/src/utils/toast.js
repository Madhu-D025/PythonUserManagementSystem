import { message } from 'antd';

// Setup default config if needed
message.config({
  top: 50,
  duration: 3,
});

export const toastSuccess = (msg) => {
  message.success(msg || "Action completed successfully");
};

export const toastError = (msg) => {
  message.error(msg || "An unexpected error occurred");
};

export const toastInfo = (msg) => {
  message.info(msg);
};
