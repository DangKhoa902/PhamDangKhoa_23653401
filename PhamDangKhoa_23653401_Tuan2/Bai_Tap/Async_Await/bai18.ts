interface User {
  id: number;
  name: string;
}

async function fetchUser(id: number): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: `User_${id}` });
    }, 1000);
  });
}

async function bai18() {
  const user = await fetchUser(101);
  console.log("Bài 18 User:", user);
}

bai18();