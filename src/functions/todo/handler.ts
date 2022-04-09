import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import TodosService from "@services/todoService";
import { TodoStatus } from "@libs/types";

export const getAllTodos = middyfy(async (): Promise<APIGatewayProxyResult> => {
  const todos = await TodosService.getAllTodos();
  return formatJSONResponse({
    todos,
  });
});

export const createTodo = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const { body } = event;
    try {
      const todo = await TodosService.createTodo({
        //@ts-ignore
        title: body.title,
        //@ts-ignore
        description: body.description,
        status: TodoStatus.TODO,
      });
      return formatJSONResponse({
        todo,
      });
    } catch (e) {
      return formatJSONResponse({
        status: 500,
        message: e,
      });
    }
  }
);

export const getTodo = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try {
      const todo = await TodosService.getTodo(Number(id));
      return formatJSONResponse({
        todo,
      });
    } catch (e) {
      return formatJSONResponse({
        status: 500,
        message: e,
      });
    }
  }
);

export const updateTodo = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try {
      const todo = await TodosService.updateTodo({
        id: Number(id),
        //@ts-ignore
        ...event.body,
      });
      return formatJSONResponse({
        todo,
        id,
      });
    } catch (e) {
      return formatJSONResponse({
        status: 500,
        message: e,
      });
    }
  }
);

export const deleteTodo = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try {
      const todo = await TodosService.deleteTodo(Number(id));
      return formatJSONResponse({
        todo,
        id,
      });
    } catch (e) {
      return formatJSONResponse({
        status: 500,
        message: e,
      });
    }
  }
);
