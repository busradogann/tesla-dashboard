import React from 'react';
import Image from 'next/image';

import { Topic } from '../models/topic';
import ProgressBar from './progress-bar';

export const Topics: React.FC<{ title: string, topics: Topic[], weakestLoading: boolean, weakestError: string | null }> 
  = ({ title, topics, weakestLoading, weakestError }) => {
    if (weakestLoading) return <p>Loading...</p>;
    if (weakestError) return <p>{weakestError}</p>;
    
    return (
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden rounded-[20px]">
        <div className="p-4">
          <h2 className="text-lg text-black/50 mb-4">{title}</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full w-full table-auto">
              <tbody className="text-gray-600 text-sm font-light">
              {topics.map((topic: Topic) => (
                <tr className="flex justify-between items-center p-2" key={topic.id}>
                  <td className="w-full py-3 px-6 text-left flex flex-row">
                    <Image src={`/icons/${topic.image}`} width={50} height={32} alt={topic.name} />
                      <div className='w-full flex flex-col pl-4'>
                        {topic.name}
                          <ProgressBar 
                            progress={topic.readingPercentage} 
                            fillColor="bg-orange" 
                            emptyColor="bg-yellow"
                          />
                        <div className="h-4 bg-red-500"></div>
                    </div>
                  </td>
                  <td className="py-3 px-6 pl-4 text-left text-lg flex gap-4"> 
                    <span className='text-black font-bold'>{topic.readingPercentage}%</span> <span className='text-black/50'>Correct</span>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
}