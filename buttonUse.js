function instructionPage(){
    let mainPage = document.querySelector(".mainPage");
    // mainPage.style.display = "none";
    mainPage.innerHTML = `
    <div class = "about">
        <h2 class="title">Input</h1>
        <p class = "describe">You have to input percentage value of 
        a minute</p>
        <h3>Example</h3>
        <span class = "example">0.5 = 30 seconds</span> 
        <br>
        <span class = "example">0.25 = 15 seconds</span> 
        <br>
        <span class = "example">0.75 = 45 seconds</span>
        <br> 
        <span class = "example">1 = 1 minute seconds</span> 
        <br>
        <h3>Restart Training</h3>
        <p>If you want to restart training press restart or reload the page</p>
        <h3>Thats all, enjoy :3</h3>
    </div>
    `;
    // document.querySelector(".title").style.color = "white";
}
function homePage(){
    window.location.reload();
}