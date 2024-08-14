"use client";

import { useEffect, useState } from 'react';
import { components } from 'react-select';
import Image from "next/image";
import dynamic from 'next/dynamic';

import Navbar from "../../components/navbar";
import MiniCard from '../../components/mini-card';
import Groups from '../../components/groups';
import { BarChart } from '../../components/activity-chart';
import { Topics } from "../../components/topics";
import { getStrongestTopics } from '../../services/strongest-topics';
import { getWeakestTopics } from '../../services/weakest-topics';
import { Topic } from '../../models/topic';
import Users from '../../components/users';


export default function Home(this: any) {
  const Select = dynamic(() => import('react-select'), { ssr: false });
  const [selectedOption, setSelectedOption] = useState(null);
  const [strongestTopics, setStrongestTopics] = useState<Topic[]>([]);
  const [strongestLoading, setStrongestLoading] = useState<boolean>(true);
  const [strongestError, setStrongestError] = useState<string | null>(null);
  const [weakestTopics, setWeakestTopics] = useState<Topic[]>([]);
  const [weakestLoading, setWeakestLoading] = useState<boolean>(true);
  const [weakestError, setWeakestError] = useState<string | null>(null);

  const options = [
    { value: 'lastSevenDays', label: 'Last 7 Days' },
    { value: 'thisMonth', label: 'This Month' },
    { value: 'thisYear', label: 'This Year' },
    { value: 'custom', label: 'Custom' }
  ];

  const topicOptions = [
    { value: null, label: 'All' },
    { value: 'technology', label: 'Technology' }
  ];

  const CustomSingleValue = ({ data }: any) => (
    <components.SingleValue {...data}>
      {data.label || 'Please select an option'}
    </components.SingleValue>
  );

  const customStyles = {
    container: (provided: any) => ({
      ...provided,
      width: '100%',
      padding: '0 8px',
      marginBottom: '1rem'
    }),
    control: (provided: any) => ({
      ...provided,
      borderColor: '#EFF0F6',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#EFF0F6',
      },
      borderRadius: '8px',
    }),
    menu: (provided: any) => ({
      ...provided,
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    }),
    menuList: (provided: any) => ({
      ...provided,
      padding: '0',
    }),
    option: (provided: any, state: { isSelected: any; }) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#d1d5db' : 'white',
      color: state.isSelected ? 'white' : 'black',
      padding: '10px 20px',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#f1f5f9',
      },
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: 'black',
    }),
  };

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await getStrongestTopics();
        setStrongestTopics(response.content);
      } catch (error) {
        setStrongestError('Error fetching topics');
        console.error('Error fetching topics:', error);
      } finally {
        setStrongestLoading(false);
      }
    };

    fetchTopics();
  }, []);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await getWeakestTopics();
        if(selectedOption) response.content.filter((t: { subject: any; })=> t.subject == selectedOption)
        let topics = response.content.splice(0, 3);
        setWeakestTopics(topics);
      } catch (error) {
        setWeakestError('Error fetching topics');
        console.error('Error fetching topics:', error);
      } finally {
        setWeakestLoading(false);
      }
    };

    fetchTopics();
  }, []);

  const handleChange = async (option: any) => {
    setSelectedOption(option.value);
    const response = await getWeakestTopics();
    
    if (option.value) {
      const filteredTopics = response.content.filter((t: { subject: any; }) => t.subject === option.value);
      const splicedTopics = filteredTopics.splice(0, 3);
      setWeakestTopics(splicedTopics);
    } else {
      const splicedTopics = response.content.splice(0, 3);
      setWeakestTopics(splicedTopics);
    }
  };

  return (
    <main className="flex flex-col">
      <div className="flex min-h-screen">
        {/* Left NavBar */}
        <Navbar />

        {/* Main Content */}
        <main className="md:ml-64 flex-1 p-2 md:p-8">
          <h2 className="text-2xl font-bold mb-4 flex justify-between items-center">
            Reports

            <a href='#' className="flex font-normal items-center text-sm text-black/75">
              <Image src={`../../icons/download.svg`} width={20} height={20} alt={`Download Report`} className="flex self-start" />
              Download
            </a>
          </h2>
          <div className="py-4">
            <div className=" border-b border-black opacity-10"></div>
          </div>

          <div className="block lg:flex justify-content-between gap-4">
            <Select 
              options={options}
              styles={customStyles} 
              placeholder="Timeframe: This Month" 
              components={{ SingleValue: CustomSingleValue }} 
              isSearchable
            />
            <Select options={options} 
              styles={customStyles} 
              placeholder="People: All" 
              components={{ SingleValue: CustomSingleValue }} 
              isSearchable
              isMulti 
            />
            <Select options={topicOptions} 
              styles={customStyles} 
              placeholder="Topic: All" 
              components={{ SingleValue: CustomSingleValue }} 
              isSearchable 
              onChange={handleChange} />
          </div>

          <div className='block lg:flex p-1 gap-4'>
            <div className="block w-full lg:flex flex-col p-1 gap-4">
              <div className='flex p-1 gap-4'>
                <div className="min-h-[10rem] w-4/12">
                  <MiniCard
                    title="Active Users"
                    description="27/80"
                  />
                </div>
                <div className="min-h-[10rem] w-4/12">
                  <MiniCard
                    title="Questions Answered"
                    description="3,298"
                  />
                </div>
                <div className="min-h-[10rem] w-4/12">
                  <MiniCard
                    title="Av. Session Length"
                    description="2m 34s"
                  />
                </div>
              </div>

              <div className='flex p-1 gap-4'>
                <div className="min-h-[10rem] w-4/12">
                  <MiniCard
                    title="Starting Knowledge"
                    description="64%"
                    imageUrl="../../graph.svg"
                  />
                </div>
                <div className="min-h-[10rem] w-4/12">
                  <MiniCard
                    title="Current Knowledge"
                    description="86%"
                    imageUrl="../../graph.svg"
                  />
                </div>
                <div className="min-h-[10rem] w-4/12">
                  <MiniCard
                    title="Knowledge Gain"
                    description="+34%"
                    imageUrl="../../graph.svg"
                  />
                </div>
              </div>
            </div>

            <div className="block w-full lg:flex pl-4 gap-4 bg-white shadow-lg rounded-lg overflow-hidden rounded-[20px] mb-2">
              <BarChart />
            </div>
          </div>

          <div className="block lg:flex p-1 gap-4">
            <div className="w-full mb-4">
              <Topics title='Weakes Topics' 
                topics={weakestTopics} 
                weakestLoading={weakestLoading} 
                weakestError={weakestError} 
              />
            </div>
            <div className="w-full">
              <Topics title='Strongest Topics' 
                topics={strongestTopics} 
                weakestLoading={strongestLoading} 
                weakestError={strongestError} 
              />
            </div>
          </div>

          <div className="block lg:flex p-1 gap-4">
            <div className="w-full mb-4">
              <Users title={'User Leaderboard'} />
            </div>
            <div className="w-full">
              <Groups title={'Groups Leaderboard'} />
            </div>
          </div>
        </main>
      </div>
    </main>
  );
}
