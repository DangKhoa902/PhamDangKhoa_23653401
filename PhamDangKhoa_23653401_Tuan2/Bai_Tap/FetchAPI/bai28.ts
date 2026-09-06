function mockTask(id : number): Promise<string>{
    return new Promise((res) =>{
        setTimeout(()=> res(`Task ${id} completed`) , 1000)
    });
}

async function batchProcess() {
  const tasks = [1, 2, 3, 4, 5].map((id) => mockTask(id));
  console.log("Đang xử lý Batch 5 tasks...");
  const results = await Promise.all(tasks);
  console.log("Bài 28 Batch Result:", results);
}

batchProcess();