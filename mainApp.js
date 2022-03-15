
function startButton(){
    let indexPrepare = 0;
    let index = 0;
    let bellPlayed = 0;
    //TODO: Declare Input Variables
    const workTimeInput = ParseFloat(document.querySelector(".workTime").value,1) * 60;
    const restTimeInput =  ParseFloat(document.querySelector(".restTime").value,1) * 60;
    const setsInput = document.querySelector(".setsAmount").value * 1;
    const prepareTimeInput = document.querySelector(".prepareTime").value;
    const startCountdown = document.querySelector(".time");
    const background = document.querySelector("body");
    const mainBody = document.querySelector(".backgroundPage");

    //Delcare States

    let work = true;
    let rest = false;
    let state = document.querySelector(".phase");
    let roundsCount =document.querySelector(".roundsCount");

    //Declare Buttons 

    const beginButton = document.getElementById("startButton");
    const resetButton = document.getElementById("resetButton");

    //Declare Total Time Variable

    let temp = (workTimeInput + restTimeInput) * setsInput + (2 * setsInput);
    let timeout = (prepareTimeInput * 1000) + 100;
    let currentRound = 1;

    //Declare Main Using Variables in Fucntion
    
    let roundTime = workTimeInput;
    let restTime = restTimeInput;
    let time = prepareTimeInput;
    let prepare = prepareTimeInput;

    //Get Alerts

    const alert10Sec = document.getElementById("alertPrepareSeconds");
    const bell = document.getElementById("boxBell");

    //Check if Everything was Inputed

    if(workTimeInput === 0 || restTimeInput === 0 ||
    setsInput === 0 || prepareTimeInput === 0){
        alert("Input round and rest time and number of rounds");
        return;
    }
    else{
        updateRoundsCount(); // Update Rounds Table with new count of rounds
        beginButton.innerText = "STOP";
        beginButton.style.display = "none";
        resetButton.onclick = newWorkout;
        var temporary = setInterval(()=>{
            if(indexPrepare == time){ //Here has to be == not ===
                alert10Sec.pause();
                clearInterval(temporary);
            }
            else{
                alert10Sec.play();   
                getReady(startCountdown);
            }
            
            indexPrepare++;
        },1000);

        setTimeout(()=>{    
            var startInterval = setInterval(() => {
                if(index === temp){
                    clearInterval(startInterval);                
                    background.innerHTML = `
                    <h1 class="title">Congratulations</h1>
                    <div class="inputs-container">
                    <button class="btn" onclick="newWorkout()">Again</button>
                    </div>  
                    `;
                }
                else if(rest === true){
                    mainBody.style.boxShadow = " 0px 5px 26px 8px #26ff26"; 
                    if(bellPlayed == 1){
                        bell.play();
                        bellPlayed--;
                        currentRound+=1;
                    } 
                    updateRest();
                    resetRoundTime();
                }
                else if(work === true){   
                    mainBody.style.boxShadow = " 0px 5px 26px 8px #ff2626";     
                    changeRound();
                    if(bellPlayed == 0){
                        bell.play();
                        bellPlayed++;
                    }  
                      
                    updateRound();
                    resetRestTime();
                }
                index+=1;
            }, 1000);          
        },timeout);
        function updateRoundsCount(){
            roundsCount.innerHTML = `${1}/${setsInput}`;
        }
        function changeRound(){ //Change Value of rounds co current
            roundsCount.innerHTML = `${currentRound}/${setsInput}`;
        }
        //Rounds and Rest Updates functions
        function updateRound(round){
            state.innerText = "Work";
            if(startCountdown.innerText === "0:01"){
                rest = true;
                work = false;
            }
            const minutes = Math.floor(roundTime / 60);
            let seconds = roundTime % 60;
            seconds = seconds < 10 ? "0"+seconds : seconds;
            startCountdown.innerHTML = `${minutes}:${seconds}`;
            roundTime--;
        }
        function updateRest(){
            state.innerText = "Rest";
            if(startCountdown.innerText === "0:01"){
                rest = false;
                work = true;
            } 
            const minutes = Math.floor(restTime / 60);
            let seconds = restTime % 60;
            seconds = seconds < 10 ? "0"+seconds : seconds;
            startCountdown.innerText = `${minutes}:${seconds}`;
            restTime--; 
        }
        function resetRoundTime(){
            return (roundTime = workTimeInput);
        }
        function resetRestTime(){
            return (restTime= restTimeInput);
            
        }
        //Fuction which makes countdown
        function getReady(element){
            // alert10Sec.play();
            let seconds = prepare;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            //element.style.display = "none";
            element.innerHTML = `
            <span class="time" id="time">00:${seconds}</span>
            `
            prepare--;           
        }
    }
    //Fuction To Float Numbers
    function ParseFloat(str,val) {
        str = str.toString();
        str = str.slice(0, (str.indexOf(".")) + val + 1); 
        return Number(str);   
    }
}

const newWorkout=()=>{
    window.location.reload();
};