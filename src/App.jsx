import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import StartScreen from './StartScreen'
import './App.css'
import { motion, removeAxisTransforms } from "framer-motion";
import { useEffect } from 'react'
import HealthBar from './HealthBar';
import GameOverScreen from './GameOverScreen';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
   const [playerName, setPlayerName]   = useState("");
  const [count, setCount] = useState(0);
  const [xValue,setxValue]=useState(0);
   const [xEnemyValue,setxEnemyValue]=useState(0);
  const[direction,setDirection]=useState(1);
  const[eDirction,setEDirection]=useState(-1);
  const [action,setAction]=useState("Idle__00");
  const[eAction,setEAction]=useState("Idle__00");
  const[eCount,setECount]=useState(0);
  const interval=useRef(null);
  const eInterval=useRef(null);
  const [duration,setDuration]=useState(1);
   const[eduration,setEDuration]=useState(1);
   const [youHealth,setYouHealth]=useState(100);
   const [enemyHelath,setEnemyHealth]=useState(100);
   const [isOver,setIsOver]=useState(false);
   const isBusy=useRef(false);
   const isOverRef = useRef(false);
   const deadInterval=useRef();
  const you=useRef();
  const enemy=useRef();
   function handleGameStart(name) {
     setPlayerName(name);
     setGameStarted(true);
   }
    function handleRestart() {
     setYouHealth(100);
     setEnemyHealth(100);
     setxValue(0);
     setxEnemyValue(0);
     setAction("Idle__00");
     setEAction("Idle__00");
     setCount(0);
     setECount(0);
     setDirection(1);
     setEDirection(-1);
     setIsOver(false);
     isOverRef.current = false;
     isBusy.current = false;
   }
  function collision(xEnemy,xyou){
    const youInfo   = you.current.getBoundingClientRect();
  const enemyInfo = enemy.current.getBoundingClientRect();
  const youLeft   = youInfo.x   + xyou;
  const youRight  = youLeft     + youInfo.width;
  const enemyLeft = enemyInfo.x + xEnemy;
  const enemyRight = enemyLeft  + enemyInfo.width;

  const overlap = Math.min(youRight, enemyRight) - Math.max(youLeft, enemyLeft);
  return overlap;
 }
  function dead(val){
      if(deadInterval.current)clearInterval(deadInterval.current)
    if(interval.current) clearInterval(interval.current)
   if(eInterval.current) clearInterval(eInterval.current)   
      if(val==1){
        setEAction("Dead__00");
        setECount(0);
       deadInterval.current= setInterval(()=>{
          setECount(c=>(c===9?9:c+1));
        },100)
      }
      else{
        setAction("Dead__00");
        setCount(0);
        deadInterval.current=setInterval(()=>{
          setCount(c=>(c===9?9:c+1));
        })
      }
     setTimeout(()=>{
     clearInterval(deadInterval.current)
     },1000);
  }
  useEffect(()=>{
        if(youHealth<=0){
          setIsOver(true);
          isOverRef.current=true;
           dead(0);
       }
      else if(enemyHelath<=0){
          isOverRef.current=true;
         setIsOver(true);
        dead(1);
       }
  },[youHealth,enemyHelath]);
    function isHit(){
       if (!you.current || !enemy.current) return false;
      const youInfo   = you.current.getBoundingClientRect();
      const enemyInfo = enemy.current.getBoundingClientRect();
       if(direction===-1){
          if(youInfo.x-enemyInfo.x<200) return true;
           else return false;  
       }
       if(direction===1){
        if(enemyInfo.x-youInfo.x<200) return true;
         else return false;
       }
    }
    function movementsEnemy(movement,dir,x){
      if(isOver) {
        clearInterval(eInterval.current);
         return;}
       clearInterval(eInterval.current);
          setEAction(movement);
          if (dir !== 0) setEDirection(dir);
          setECount(c=>(c===9?0:c+1))
           eInterval.current=setInterval(()=>{
           if(dir!==0) setEDirection(dir); setECount(c=>(c===9?0:c+1))
           },50);
             if(movement=="Attack__00"){
               if(isHit()){
                 console.log("hit");
                 if(eDirction==1){  
                  setTimeout(()=>{setxValue(v=> v+20)},200) 
                  setYouHealth(h=>h-10);
                }
                   if(eDirction==-1){ 
                     setTimeout(()=>{setxValue(v=> v-20)},200) 
                     setYouHealth(h=>h-10);
                   }
               }
             }
             if(movement==="Run__00"){
               if(dir===1){
                   let overlap=collision(0,x);
                    setxEnemyValue(e =>{
                const newX=e +x-(overlap>0?overlap:0);
                 if(newX>=850){
                 return e;
                 }
                 else{
                  return newX
                 }
               });
               }
               else if(dir==-1)
                {
                  let overlap=collision(0,x);
                 setxEnemyValue(e => {
                 const newX = e + x + (overlap > 0 ? overlap : 0);
                   console.log(newX);
                  return Math.max(newX, -600);
                 });
               } 
             }
              setTimeout(()=>{
            setEAction("Idle__00");
           clearInterval(eInterval.current);
      },1000)
    }
     function movements(movement,dir,x){
              if(isBusy.current) return;
              isBusy.current=true;
             if(isOver) {
              clearInterval(interval.current);
                  return;}
              setAction(movement);
          if (dir !== 0) setDirection(dir);
          setCount(c=>(c===9?0:c+1))
           interval.current=setInterval(()=>{
           if(dir!==0) setDirection(dir);
              setCount(c=>(c===9?0:c+1))
             console.log(action+count+".png");
           },50);
             if(movement=="Attack__00"){
               if(isHit()){
                 console.log("hit");
                  if(direction==1){
                       setxEnemyValue(v=>v+20);
                       setEnemyHealth(h=>h-10);
                  }  
                   if(direction==-1){  
                    setxEnemyValue(v=>v-20);
                     setEnemyHealth(h=>h-10);
                   }
               }
             }
             if(movement==="Run__00"){
               if(dir===1){
                   let overlap=collision(0,100);
                    setxValue(e =>{
                    const newX=e +x-(overlap>0?overlap:0);
                    setDuration((x-overlap)/x);
                 if(newX>=850){
                 return e;
                 }
                 else{
                  return newX
                 }
               });
               }
               else if(dir==-1)
                {
                    let overlap=collision(0,-50);
                setxValue(e => {
                 const newX = e + x + (overlap > 0 ? overlap : 0);
                   console.log(newX);
                  return Math.max(newX, 0);
                 });
               } 
             }
              setTimeout(()=>{
            setAction("Idle__00");
           isBusy.current=false;
          clearInterval(interval.current);
      },1000)
     }
    useEffect(()=>{
 const righkey = (e) => {
  if(isOverRef.current) return;
  if (interval.current) clearInterval(interval.current);
  if (e.key === "ArrowRight") {
    movements("Run__00", 1, 100);
  }
  else if (e.key === "a" || e.key === "A") {
  movements("Attack__00", 0, 0);
  }
  else if (e.key === "s" || e.key === "S") {
    movements("Jump_Attack__00", 0, 0);
  }
  else if (e.key === "ArrowUp") {
   movements("Jump__00", 0, 0);
  }
  else if (e.key === "ArrowLeft") {
   movements("Run__00", -1, -100);
  }
};
window.addEventListener("keydown", righkey);
  return () => {
    window.removeEventListener("keydown", righkey);
    if (interval) clearInterval(interval);
  };
},[])



useEffect(()=>{

  const aiLoop=setInterval(()=>{
    //console.log(isOver);
     if(isOverRef.current) return;
    if(!you.current || !enemy.current) return;
    if(isOver) return;
    const youInfo=you.current.getBoundingClientRect();
    const enemyInfo=enemy.current.getBoundingClientRect();
    const val=youInfo.x-enemyInfo.x;
      
        if(val>0){
          if(val>200) movementsEnemy("Run__00",1,100);
          else movementsEnemy("Attack__00",0,0);
        }
        else{
          if(val<(-200)) movementsEnemy("Run__00",-1,-100);
          else movementsEnemy("Attack__00",0,0);
        }
  },1600);
 return ()=> clearInterval(aiLoop);
},[]);
  const JUMP_Y = [0, -100, 0];
   return (
     <>
       {!gameStarted && <StartScreen onStart={handleGameStart} />}

       {gameStarted && (
         <>
          <div
  style={{
    display: 'flex',
    backgroundImage: `url("background.jpg")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100vw',
    height: '100vh',
    padding:0,

  }}
>
   <div style={{position:'fixed', top:0,left:0,zIndex:2}}>
      <HealthBar youHealth={youHealth} name={playerName} top={20} left={20}></HealthBar>
   </div>
   <div style={{position:'fixed', top:0,right:0,zIndex:2}}>
          <HealthBar youHealth={enemyHelath} name="Enemy" top={20} left={1400}></HealthBar>
   </div>
   <motion.img ref={you}
  src={action + count + ".png"}
  style={{ height: (action==="Attack__00" || action==="JumpAttack__00")?220:200, position: 'relative', left: 50 ,top:520,
           scaleX: direction
  }}
  initial={{ x: 0, y: 0 }}
  animate={{
    x: xValue,
    y: (action === "Jump__00" || action === "Jump_Attack__00") ? JUMP_Y : 0

  }}
  transition={{
    x:      { duration: 1, ease: "linear" },  // smooth movement
    y:      { duration: 1, ease: "linear" },  // smooth jump
                    // ✅ instant flip, no shrinking
  }}
/>

 <motion.img ref={enemy}
        src={eAction+eCount+".png"}
        style={{
             height: (action==="Attack__00" || action==="JumpAttack__00")?220:200,
              position:'relative',
              left:700,
              top: 520,   // ✅ instead of y
          scaleX: eDirction   // ✅ instant flip (NO animation)
        }
      }
      initial={{
         x:0,
         y:0
      }}
      animate={{
        x:xEnemyValue,
         y: (eAction === "Jump__00" || eAction === "Jump_Attack__00") ? JUMP_Y : 0
      }}
       transition={{
    x:      { duration: 1, ease: "linear" },  // smooth movement
    y:      { duration: 1, ease: "linear" },  // smooth jump
                    // ✅ instant flip, no shrinking
  }}

        // initial={{ x: 0,
        //            y:0
        //  }}
        
        // animate={{ x: xValue ,
        //         scaleX: direction ,
        //          y:(action ==="Jump__00" ||action ==="Jump_Attack__00" )?JUMP_Y:0                
                                        
        // }} 

       // transition={{ duration: 1, ease: "linear" }}
/>

      </div>
       <GameOverScreen
     isOver={isOver}
     youHealth={youHealth}
     enemyHealth={enemyHelath}
     onRestart={handleRestart}
   />
       {/* <motion.div 
           initial={{opacity:0, }}
           animate={{opacity:1,y:50}}
           transition={{duration:2, ease:"easeIn"} 
          }
       > 
        <h1>Hellow World</h1> 
       </motion.div> */}

           <GameOverScreen
             isOver={isOver}
             youHealth={youHealth}
             enemyHealth={enemyHelath}
             onRestart={() => {
               setGameStarted(false); 
               
             }}
           />
         </>
       )}
     </>
   );
  
}

export default App
