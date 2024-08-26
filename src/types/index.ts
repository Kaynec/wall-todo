export type TodoType = {
  name: string;
  time: string;
  deadline: string;
  id: string;
};

export enum ModalTypeEnum {
  DELETE = 1,
  EDIT = 2,
  ADD = 3,
  DEFAULT = 4,
}

export type ModalType = ModalTypeEnum;
