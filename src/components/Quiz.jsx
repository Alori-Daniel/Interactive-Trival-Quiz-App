import {React, useEffect, useState} from 'react'
import './home.css';

const Quiz = () => {

    const [data, setData] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({}); // Track selected answers for each question
    const [clickedIndices, setClickedIndices] = useState({}); // Track clicked index for each question
    const [submitted, setSubmitted] = useState(false); // Track if the quiz has been submitted
    const [score, setScore] = useState(0); // Track the user's score
    const [reset, setReset] = useState(false);

    const handleClick = (answer, questionIndex, answerIndex) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [questionIndex]: answer,
        }));
        // console.log("selectedAns",selectedAnswers);
        setClickedIndices((prev) => ({
            ...prev,
            [questionIndex]: answerIndex,
        }));
        // console.log("clickedindice",clickedIndices);
        console.log(`Selected Answer for Question ${questionIndex + 1}:`, answer);
    };
    useEffect(() => {
        console.log("selectedAnswers updated:", selectedAnswers);
    }, [selectedAnswers]);
    
    // useEffect(() => {
    //     console.log("clickedIndices updated:", clickedIndices);
    // }, [clickedIndices]);


    function handleSubmit() {
        let newScore = 0;
        data.forEach((question, questionIndex) => {
            if (selectedAnswers[questionIndex] === question.correct_answer) {
                newScore++;
            }
        });
        setScore(newScore);
        setSubmitted(true);
    }
    const getData = async () =>{
        try{
            const response =await fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple")
            if(response.ok){
                const result = await response.json();
                // console.log(result.results);

                const shuffledData = result.results.map(datas=> ({
                    ...datas,
                    shuffledAnswers : shuffleArray([...datas.incorrect_answers, datas.correct_answer])
                }))
                setData(shuffledData);
                console.log(shuffledData);
                
            }
            else{
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
        }
        catch(error){
            console.log(error.message)
        }
        finally{

        }
    }
    const handleRestart = () => {
        setSelectedAnswers({});
        setClickedIndices({});
        setSubmitted(false);
        setScore(0);
        getData(); // Refetch the quiz data to start fresh
    };

    useEffect(()=>{
        getData();


    },[]);
// UNDERSTAND SORT USE CASES
    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    const decodeHtmlEntities = (text) => {
        const parser = new DOMParser();
        const decodedString = parser.parseFromString(text, 'text/html').body.textContent;
        return decodedString;
    };

  return (
    <div style={{display:"flex", justifyContent:"center", paddingTop:"1rem", flexDirection:"column",alignItems:"center",width:"100%,"}}>
        <div className='ans-div' style={{maxWidth:"600px", padding:"0.3rem"}}>
            <h1 style={{textAlign:"center", color:"#4D5B9E"}}>Questions</h1>
        {
            data.map((datas,questionIndex) => {
                return (
                <div key={questionIndex} >
                    <h2 className='question' style={{marginBottom:"1rem", textAlign:"left", color:"rgba(41, 50, 100, 1)"}}>{questionIndex +1}. {decodeHtmlEntities(datas.question)}</h2>
                   <div className='answer-div' style={{display:"flex", width:"100%"}}> 
                    {datas.shuffledAnswers.map((answer, answerIndex) => {
                            let answerClass = 'p-quiz';
                            if (submitted) {
                                if (answer === datas.correct_answer) {
                                    answerClass = 'correct'; 
                                } else if (clickedIndices[questionIndex] === answerIndex) {
                                    answerClass = 'incorrect'; 
                                }
                            } else if (clickedIndices[questionIndex] === answerIndex) {
                                answerClass = 'clicked'; 
                            }
                        return(
                                        <p key={answerIndex} className={answerClass} disabled={submitted} onClick={()=>{
                                            handleClick(answer, questionIndex, answerIndex)
                                            
                                            // console.log("anserIndex", answerIndex);
                                            // console.log("questionIndex", questionIndex);
                                        }
                                        }  >{decodeHtmlEntities(answer)}</p> 
                                    )})}
                    </div>
                    <hr/>
                </div>
                )
            }
        
            )
        }
        </div>

        {/* <button onClick={()=>handleSubmit()}>Check Answer</button> */}
        {!reset ?(
        <div>
        <button onClick={()=>{handleSubmit()
            setReset(true)
        }} disabled={submitted}>Check Answer</button>
        {/* {submitted && <h3>Your Score: {score} / {data.length}</h3>} */}
        </div>
    ):(
        <div style={{textAlign:"center"}}>
            {reset && <h1>Your Score: {score} / {data.length}</h1>}
        <button onClick={()=>{
            setReset(false)
            handleRestart()
        }}>Restart Quiz</button>
        
        </div>
    )
        }
    </div>
  )
}

export default Quiz






// [
//     {
//         "type": "multiple",
//         "difficulty": "easy",
//         "category": "Entertainment: Film",
//         "question": "In Big Hero 6, what fictional city is the Big Hero 6 from?",
//         "correct_answer": "San Fransokyo",
//         "incorrect_answers": [
//             "San Tokyo",
//             "Tokysisco",
//             "Sankyo"
//         ],
//         "shuffledAnswers": [
//             "San Tokyo",
//             "Tokysisco",
//             "Sankyo",
//             "San Fransokyo"
//         ]
//     },
//     {
//         "type": "multiple",
//         "difficulty": "easy",
//         "category": "Entertainment: Film",
//         "question": "Who directed &quot;E.T. the Extra-Terrestrial&quot; (1982)?",
//         "correct_answer": "Steven Spielberg",
//         "incorrect_answers": [
//             "Stanley Kubrick",
//             "James Cameron",
//             "Tim Burton"
//         ],
//         "shuffledAnswers": [
//             "Steven Spielberg",
//             "Tim Burton",
//             "James Cameron",
//             "Stanley Kubrick"
//         ]
//     },
//     {
//         "type": "multiple",
//         "difficulty": "easy",
//         "category": "Entertainment: Film",
//         "question": "The 2002 film &quot;28 Days Later&quot; is mainly set in which European country?",
//         "correct_answer": "United Kingdom",
//         "incorrect_answers": [
//             "France",
//             "Italy",
//             "Germany"
//         ],
//         "shuffledAnswers": [
//             "Germany",
//             "United Kingdom",
//             "Italy",
//             "France"
//         ]
//     },
//     {
//         "type": "multiple",
//         "difficulty": "easy",
//         "category": "Entertainment: Film",
//         "question": "For the film &quot;Raiders of The Lost Ark&quot;, what was Harrison Ford sick with during the filming of the Cairo chase?",
//         "correct_answer": "Dysentery",
//         "incorrect_answers": [
//             "Anemia",
//             "Constipation",
//             "Acid Reflux "
//         ],
//         "shuffledAnswers": [
//             "Acid Reflux ",
//             "Dysentery",
//             "Anemia",
//             "Constipation"
//         ]
//     },
//     {
//         "type": "multiple",
//         "difficulty": "easy",
//         "category": "Entertainment: Film",
//         "question": "What was the first monster to appear alongside Godzilla?",
//         "correct_answer": "Anguirus",
//         "incorrect_answers": [
//             "King Kong",
//             "Mothra",
//             "King Ghidora"
//         ],
//         "shuffledAnswers": [
//             "Anguirus",
//             "King Ghidora",
//             "Mothra",
//             "King Kong"
//         ]
//     }
// ]