import { DataTypes, Model, Sequelize } from "sequelize";

export class Todo extends Model {}

export function initTodo(sequelize: Sequelize) {
  Todo.init(
    {
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    { sequelize, modelName: "todo" }
  );
}
