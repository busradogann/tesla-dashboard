import React from 'react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import {User} from '../models/user';
import { getUsers } from '../services/users';

const Users: React.FC<{ title: string }> = ({ title }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        const sortedUsers = response.content.sort((a: { correctRatio: number; }, b: { correctRatio: number; }) => b.correctRatio - a.correctRatio);
        setUsers(sortedUsers);
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
        <h2 className="text-lg text-black/50 mb-4">{title}</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full w-full table-auto">
            <tbody className="text-gray-600 text-sm font-light">

              {users.map((user: User, index) => (
                <tr className="flex justify-between items-center p-2" key={user.id}>
                  <td className="py-3 px-6 text-left flex flex-row">
                    <Image src={`/${user.image}`} width={50} height={28} alt={user.name} />
                    <div className='flex flex-col pl-4'>
                      <span className='font-bold'>{user.name}</span>
                      <div className="text-black/50 text-sm">
                        {user.points && `${user.points} Points`}
                        {user.correctRatio && ` - ${user.correctRatio}% Correct`}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-6 pl-4 text-left text-lg flex items-center gap-4"> 
                    {index+1}
                    {user.pointsIncreased && <Image src={`/icons/up.svg`} width={10} height={10} alt={''} />}
                    {!user.pointsIncreased && <Image src={`/icons/down.svg`} width={10} height={10} alt={''} />}
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

export default Users;