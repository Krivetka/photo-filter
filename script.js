const sliders = document.querySelectorAll(".filters input");
const reset = document.querySelector(".btn-reset");
const next = document.querySelector(".btn-next");
const buttons = document.querySelectorAll(".btn");
const imgElement = document.querySelector('img');
let count = 2;
const fileInput = document.querySelector("input[type=\"file\"]");
const save = document.querySelector(".btn-save");

function btnActive(){
    for(let i = 0; i < 4; i++){
        if(buttons[i].classList.contains("btn-active")) buttons[i].classList.remove("btn-active");
    }
    this.classList.add("btn-active");
}
buttons.forEach(elem => elem.addEventListener("click", btnActive));

function rangeVal() {
    const sizing = this.dataset.sizing;
    document.documentElement.style.setProperty(`--${this.name}`, `${this.value}${sizing}`);
    this.nextSibling.nextSibling.value = this.value
}
sliders.forEach(elem => elem.addEventListener("input", rangeVal));

reset.addEventListener("click", (elem) => {
    for(let i = 0; i < 5; i++){
        sliders[i].value = sliders[i].getAttribute("value");
        document.documentElement.style.setProperty(`--${sliders[i].name}`, `${sliders[i].value}${sliders[i].dataset.sizing}`);
        sliders[i].nextSibling.nextSibling.value = sliders[i].value;
    }
});


next.addEventListener("click", () => {
    imgElement.src = `assets/img/${count}.jpg`;
    count = count<4?++count:1;
});

fileInput.addEventListener("input", () => {
    let file = fileInput.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.addEventListener("load", () => {
        imgElement.src = reader.result;
        fileInput.value = "";
    });
});

save.addEventListener("click", () => {
    const canvas = document.createElement("canvas");
    const img = new Image();
    img.setAttribute("crossOrigin", "anonymous");
    img.src = imgElement.src;

    img.addEventListener("load", () => {
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        let k;
        if (img.width > img.height) {
            k = img.width / imgElement.width;
        } else {
            k = img.height / imgElement.height;
        }

        ctx.filter = `blur(${sliders[0].value*k}px)` + `invert(${sliders[1].value}%)` + `sepia(${sliders[2].value}%)` + `saturate(${sliders[3].value}%)` + `hue-rotate(${sliders[4].value}deg)`;
        console.log(ctx.filter);
        ctx.drawImage(img, 0, 0);
        let link = document.createElement("a");
        link.download = "image.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
        link.delete;
    });

});
