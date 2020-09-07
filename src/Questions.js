import React from 'react';
import Options from './Options';

class Questions extends React.Component {

    state = {
        questions: 'What is my name ?',
        correctAnswer: '',
        count: 0,
        options: [],
        nextQuestion: false,
        correctCount: 0,
        selected: false
    }



    constructor(props) {
        super(props);
      }

      setQuestion = () => {        
         const questions = this.props.quizData.results[this.state.count] || '';
         this.setOptions(questions);
         if(this.state.count !== this.props.quizData.results.length - 1) {
            this.setState((currentState) => ({
                questions,
                count: currentState.count + 1,
                selected: false
            }))
         }
         return false
      }

      countCheck = (e) => {
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
                correctCount: currState.correctCount + 1,
                selected: !currState.selected
            }))
        }
        return false;
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
            options: allOptions
        })
      }

    render() {
       const  { count } = this.state.count;

        return (
            <div>
                <h2 className="font-mono text-left leading-6">Spoted: {this.state.correctCount} out of {this.props.quizData.results.length}</h2>
                <div className="flex justify-center">
                    <div className="max-w-lg rounded overflow-hidden shadow-lg p-8">
                        <div className="px-6 py-4">
                            <div className="flex font-bold text-xl mb-2 justify-center items-center">
                                <span className="rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3 self-start text-white">{this.state.count}</span>
                                <p className="font-mono text-left leading-6">{this.state.questions.question}</p>
                            </div>
                        </div>
                        <Options countCheck={this.countCheck} options={this.state.options}></Options>
                    </div>
                </div>
               
                <div class="inline-flex py-3">
                    { this.state.count !== 0 ?
                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
                        Prev
                    </button> : '' }
                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r" onClick={this.setQuestion}>
                        Next
                    </button>
                </div>
            </div>
        )
    }
}

export default Questions