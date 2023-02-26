function copyText(num) {
        let index = num;
        console.log("hello world");
        if (!navigator.clipboard) {
            console.log("API not available");
            return
        }
        const examples = document.querySelectorAll("div.examplecode1, div.examplecode2, div.examplecode3, div.examplecode4");
        let sampleCode = examples.item(index).innerText;
        navigator.clipboard.writeText(sampleCode)
            .then(() => {
                console.log("Copied!")
            })
            .catch(err => {
                console.log('Code was not copied ', err);
            })
    }