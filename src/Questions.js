import React from 'react';
import Options from './Options';
import ScoreCard from './ScoreCard';
import Fade from 'react-reveal/Fade';
import Swing from 'react-reveal/Swing';
class Questions extends React.Component {

    state = {
        questions: 'What is my name ?',
        correctAnswer: '',
        count: 0,
        options: [],
        rightAnswers: [],
        nextQuestion: false,
        correctCount: 0,
        notSelected: false,
        showScoreCard: false
    }


    constructor(props) {
        super(props);
      }

      setQuestion = () => {     
         const questions = this.props.quizData.results[this.state.count] || '';
         const btnOptions =  document.querySelectorAll('.btn-option');
         btnOptions.length !== 0 && btnOptions.forEach(el =>  el.classList.remove('bg-green-400', 'focus:text-white', 'selected'));
         if((this.state.count <= 0 || this.state.selected) && this.state.count !== this.props.quizData.results.length - 1) {
            this.setState((currentState) => ({
                questions,
                count: currentState.count + 1,
                selected: false
            }))
            this.setOptions(questions);
         } else {
            return this.state.count >= 1 && this.state.count === 9 ? this.showScore() : this.setState({notSelected: true});
         }
      }

      shuffle = (a) => {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

      countCheck = (e) => {
        this.setState({notSelected: false});  
        this.state.selected = true;  
        const correctAnswer = this.props.quizData.results[this.state.count - 1].correct_answer;
        const btnOptions = Array.prototype.slice.call(e.target.parentElement.querySelectorAll('.btn-option'));
        const notSelectedOptions = btnOptions.filter(element => {
            if(element !== e.target) {
                return element;
            }
        });
        this.removeActiveClass(notSelectedOptions);
        e.target.classList.add('bg-green-400', 'focus:text-white', 'selected');
        const answer = e.target.querySelector('.option-name').innerHTML.replace(/&nbsp;/g,' '). trim();
        if(answer === correctAnswer) {
            this.setState((currState) => ({
                rightAnswers: [...currState.rightAnswers, correctAnswer],
                correctCount: currState.rightAnswers.includes(correctAnswer) ? currState.correctCount : currState.correctCount + 1,
            }))
        }
        return false;
      }

      showScore = () => {
         this.setState({showScoreCard: true})
      }

      removeActiveClass = (elements) => {
        elements.forEach((el) => {
            el.classList.remove('bg-green-400', 'focus:text-white', 'selected');
        })
      }

      setOptions = (questionData) => {
        const incorrectAnswers = questionData.incorrect_answers;
        const allOptions =  [...incorrectAnswers, questionData.correct_answer]
        this.setState({
            options: this.shuffle(allOptions)
        })
      }

    render() {
       const  { count } = this.state.count;

        return (
            <div class="flex justify-center"> { this.state.showScoreCard ?  <Fade top><Swing><ScoreCard count={this.state.correctCount} totalCount={this.props.quizData.results.length}></ScoreCard></Swing></Fade> : 
                (
                <div>
                   <h1>{this.state.correctCount}</h1>
                <div className="flex justify-center mb-3">
                    <div className="max-w-lg rounded overflow-hidden shadow-lg p-8">
                        <div className="px-6 py-4">
                            <div className="flex font-bold text-xl mb-2 justify-center items-center">
                                <span className="rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3 self-start text-white">{this.state.count}</span>
                                <p className="font-mono text-left leading-6">{this.state.questions.question}</p>
                            </div>
                        </div>
                        <Options countCheck={this.countCheck} options={this.state.options} removeSelection={this.removeSelection}></Options>
                    </div>
                </div>
                {this.state.notSelected ? (<h2 className="font-mono text-red-600 leading-6 py-4">Please Select an Option</h2>) : ''}
                <div class="inline-flex">
                    { this.state.count !== 0 ?
                    <button className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l ${this.state.count > 1 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        Prev
                    </button> : '' }
                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r" onClick={this.setQuestion}>
                    { this.state.count === 0 ? 'Start' : 'Next'}
                    </button>
                </div></div> ) 
                }
            </div>
        )
    }
}

export default Questions