import { Dispatch, SetStateAction } from "react";

export interface tasksLists {
  _id?: string;
  name: string;
  date?: string;
  color: string;
  code: string;
  make?: string;
}

export interface props {
  text?: string;
  task?: tasksLists;
  variant?: any;
  color?: any;
  onClick?: any;
  fullWidth?: boolean;
  disable?: boolean;
}

export interface modalProps {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  title: string;
  task?: tasksLists;
}

export interface authparam {
  username?: string;
  email: string;
  password: string;
}

export interface paginationtypes {
  pages: number;
  limit: number;
  total: number;
}

export interface taskfiltertypes {
  make: string;
  pageNum: number;
  search?: string;
}

export interface ThemeContextType {
  updateList: boolean;
  setUpdateList: Dispatch<SetStateAction<boolean>>;
  isLoggedIn: string | null;
  setIsLoggedIn: Dispatch<SetStateAction<string | null>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}
