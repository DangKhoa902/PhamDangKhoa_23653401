function sleep(ms : number): Promise<void>{
    return new Promise((res) => {
        setTimeout(res, ms)
    });
}

async function bai26() {
  console.log("Bắt đầu chờ 5 giây...");
  await sleep(5000);
  console.log("Đã hết 5 giây chờ!");
}

bai26();