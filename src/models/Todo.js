import uuid from "uuid";
import moment from "moment";

class Todo {
  constructor(todo) {
    this.id = uuid.v1();
    this.text = todo.text;
    this.dueon = todo.dueon;
    this.time = moment()
      .startOf("hour")
      .fromNow();
    this.type = "active";
    this.completed = false;
    this.tag = todo.tag;
  }

  getId = () => {
    return this.id;
  };

  getText = () => {
    return this.text;
  };

  setText = text => (this.text = text);

  getTag = () => {
    return this.tag;
  };

  setTag = tag => (this.tag = tag);

  getType = () => {
    return this.type;
  };

  getDueon = () => {
    return this.dueon;
  };

  setDueon = dueOn => {
    this.dueon = dueon;
  };

  setType = type => (this.type = type);

  isCompleted = () => {
    return this.completed;
  };

  setCompleted = completed => (this.completed = completed);
}

export default Todo;
