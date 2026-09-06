interface Todo{
    userID : number;
    id : number;
    title : string;
    completed : boolean;
}

async function bai21() {
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/todos/1")
        const data = await res.json();
        console.log("Bài 21 Data: ", data);
        
    } catch (error) {
        console.error(error);
    }
}

bai21();