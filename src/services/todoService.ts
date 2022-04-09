import { TODO_TABLE } from "@libs/constants";
import ITodo from "@libs/types";
import { supabase } from "@libs/supabase";

const getAllTodos = async () => {
  const { data, error } = await supabase.from(TODO_TABLE).select("*");
  if (error) {
    return error;
  }
  return data;
};

const createTodo = async (item: Partial<ITodo>) => {
  const { data, error } = await supabase.from(TODO_TABLE).insert([item]);
  if (error) {
    return error;
  }
  return data;
};

const getTodo = async (id: number) => {
  const { data, error } = await supabase
    .from(TODO_TABLE)
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    return error;
  }
  return data;
};

const updateTodo = async ({
  id,
  item,
}: {
  id: number;
  item: Partial<ITodo>;
}) => {
  const { data, error } = await supabase
    .from(TODO_TABLE)
    .update({ item })
    .match({ id });
  if (error) {
    return error;
  }
  return data;
};

const deleteTodo = async (id: number) => {
  const { data, error } = await supabase
    .from(TODO_TABLE)
    .delete()
    .match({ id });
  if (error) {
    return error;
  }
  return data;
};

export default { getAllTodos, createTodo, getTodo, updateTodo, deleteTodo };
