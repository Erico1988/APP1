// src/utils/taskUtils.js

export const generateTaskId = (marketRef, taskNumber) => {
  return `${marketRef}_TASK_${taskNumber.toString().padStart(3, '0')}`;
};
