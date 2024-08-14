import React from 'react';
import { useEffect, useState } from 'react';
import Image from 'next/image';

import { Group } from '../models/group';
import { getGroups } from '../services/groups';


const Groups: React.FC<{ title: string }> = ({ title }) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getGroups();
        const sortedGroups = response.content.sort((a: { correctRatio: number; }, b: { correctRatio: number; }) => b.correctRatio - a.correctRatio);
        setGroups(sortedGroups);
      } catch (error) {
        setError('Error fetching users');
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden rounded-[20px]">
      <div className="p-4">
        <h2 className="text-lg text-black/50 mb-4 pl-2">{title}</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full w-full table-auto">
            <tbody className="text-gray-600 text-sm font-light">
              
              {groups.map((group: Group, index) => (
                <tr className="flex justify-between items-center p-2" key={group.id}>
                  <td className="py-3 px-6 text-left">
                    <span className='font-bold'>{group.name}</span>
                    <div className="text-black/50 text-sm">
                      {group.points && `${group.points} Points`}
                      {group.correctRatio && ` / User - ${group.correctRatio}% Correct`}
                    </div>
                  </td>
                  <td className="py-3 px-6 pl-4 text-left text-lg flex items-center gap-4"> 
                    {index+1}
                    {group.pointsIncreased && <Image src={`/icons/up.svg`} width={10} height={10} alt={''} />}
                    {!group.pointsIncreased && <Image src={`/icons/down.svg`} width={10} height={10} alt={''} />}
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

export default Groups;