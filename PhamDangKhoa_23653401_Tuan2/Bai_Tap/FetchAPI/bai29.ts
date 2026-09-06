type TaskFunction = () => Promise<string>;

function createQueueTask(id: number, delay: number): TaskFunction {
  return () =>
    new Promise((resolve) => {
      setTimeout(() => {
        console.log(`[Queue] Task ${id} done after ${delay}ms`);
        resolve(`Result ${id}`);
      }, delay);
    });
}

async function queueProcess(tasks: TaskFunction[]) {
  console.log("Bắt đầu chạy Queue tuần tự...");
  for (const task of tasks) {
    await task(); // Đợi từng task chạy xong rồi mới sang loop tiếp theo
  }
  console.log("Bài 29 Queue hoàn thành!");
}

const queue = [
  createQueueTask(1, 1000),
  createQueueTask(2, 500),
  createQueueTask(3, 1200),
];

queueProcess(queue);