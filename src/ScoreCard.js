import React from 'react';
import sad from './images/sad.svg';
import happy from './images/happy.svg';
import Bounce from 'react-reveal/Bounce';

const ScoreCard = (props) => {
    return (
        <div class="max-w-sm rounded overflow-hidden shadow-lg text-center">
            <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
                { props.count !== props.totalCount - 1 ? (
                    <div className="text-center">
                        <p class="font-mono text-lg text-gray-800 text-center text-red-700 py-8">
                            You Spotted only {props.count} out of {props.totalCount - 1}
                        </p>
                        <Bounce top>
                            <img className="pt-5 m-auto" src={sad} style={ { height: 150 } } />
                        </Bounce>
                        
                    </div>
                ): 
                    <div className="text-center">
                        <h3 class="font-mono text-lg text-gray-800 text-center text-green-700 py-8">
                            Congratulations
                            <span className="pt-5">You Spotted {props.count} out of {props.totalCount}</span>
                        </h3>
                        <Bounce top>
                        <img className="pt-5 m-auto" src={happy} style={ { height: 150 } }/>
                        </Bounce>
                    </div>
                }

            </div>
        </div>
    )
}

export default ScoreCard;