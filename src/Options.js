import React from 'react';
import Zoom from 'react-reveal/Zoom';

class Options extends React.Component {
    constructor() {
        super();
    }


    state = {
        count: 0
    }



    render() {
        const { options } = this.props;
        return (
            <div class={`grid gap-4 ${options.length >= 2 ? "grid-cols-2 grid-rows-2" : "grid-cols-2 grid-rows-1"}`}>
                { options.length > 0 && options.map((item, index) => {
                    return (
                        <Zoom>
                        <button key={index} className={"bg-transparent  font-mono hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded text-left btn-option"} onClick={(e) => this.props.countCheck(e)}>
                            <div className="flex">
                            {options.length > 2 ? (<span className="">{index + 1}.</span>) : ''}
                            <span className="option-name">&nbsp;&nbsp;{item}</span>
                            </div>
                        </button>
                        </Zoom>
                    )
                })}
            </div>
        )
    }
}

export default Options;