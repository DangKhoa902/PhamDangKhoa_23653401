function downloadFile(fileName : string) : Promise<void>{
    return new Promise((res) =>{
        console.log(`Đang tải file ${fileName} ...`);
        setTimeout(()=>{
            console.log(`Tải xong file ${fileName}`);
            res();
        }, 3000)
        
    });
}

async function bai25() {
    await downloadFile("document.pdf");
}

bai25();