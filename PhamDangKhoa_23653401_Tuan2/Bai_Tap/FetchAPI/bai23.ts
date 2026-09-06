interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

async function bai23() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todos: Todo[] = await response.json();

  const uncompleted = todos.filter((todo) => !todo.completed);
  console.log("Bài 23 Uncompleted Count:", uncompleted.length);
  console.log("Bài 23 Sample Uncompleted:", uncompleted.slice(0, 3));
}

bai23();