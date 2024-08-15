"use client";

import { useEffect, useState } from 'react';
import { components } from 'react-select';
import Image from "next/image";
import dynamic from 'next/dynamic';

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
  const [showMenu, setShowMenu] = useState(false);

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

  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.backgroundColor = 'gray'
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.backgroundColor = ''
    }
  }, [showMenu]);

  return (
    <main className="flex flex-col">
      <div className="flex min-h-screen">
        {/* Left NavBar */}
        <nav className="hidden md:block w-64 h-screen bg-white shadow-md fixed text-black rounded-lg">
        <div className="flex flex-col align-start h-full justify-between p-6">
          <div>
            <Image src="/icon.svg" width={180} height={24} alt="Tesla" />
            <ul className="mt-8 space-y-4 mb-8">
              <li className="p-2 flex pl-4 rounded hover:bg-regal-blue/10 hover:text-regal-blue cursor-pointer">
                <div className="flex">
                  <img src="/icons/vector.svg" alt="Reports" className="h-5 w-5" />
                  <a href="#" className="pl-4 text-sm">Reports</a>
                </div>
              </li>
              <li className="p-2 flex pl-4 rounded hover:bg-regal-blue/10 hover:text-regal-blue cursor-pointer">
                <div className="flex">
                  <img src="/icons/quiz.svg" alt="Library" className="h-5 w-5" />
                  <a href="#" className="pl-4 text-sm">Library</a>
                </div>
              </li>
              <li className="p-2 flex pl-4 rounded hover:bg-regal-blue/10 hover:text-regal-blue cursor-pointer">
                <div className="flex">
                  <img src="/icons/people.svg" alt="People" className="h-5 w-5" />
                  <a href="#" className="pl-4 text-sm">People</a>
                </div>
              </li>
              <li className="p-2 flex pl-4 rounded hover:bg-regal-blue/10 hover:text-regal-blue cursor-pointer">
                <div className="flex">
                  <img src="/icons/assignments.svg" alt="Activities" className="h-5 w-5" />
                  <a href="#" className="pl-4 text-sm">Activities</a>
                </div>
              </li>
            </ul>

            <h5 className="pt-6 text-black/50">Support</h5>
            <ul className="mt-2 space-y-4">
              <li className="p-2 flex pl-4 rounded hover:bg-regal-blue/10 hover:text-regal-blue cursor-pointer">
                <div className="flex">
                  <img src="/icons/bulb.svg" alt="Get Started" className="h-5 w-5" />
                  <a href="#" className="pl-4 text-sm">Get Started</a>
                </div>
              </li>
              <li className="p-2 flex pl-4 rounded hover:bg-regal-blue/10 hover:text-regal-blue cursor-pointer">
                <div className="flex">
                  <img src="/icons/settings.svg" alt="Settings" className="h-5 w-5" />
                  <a href="#" className="pl-4 text-sm">Settings</a>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <div className="p-4">
              <div className="border-b border-black/10"></div>
            </div>
            <div className="flex items-center space-x-4">
              <Image src="/photo.png" width={35} height={35} className="rounded-full px-1" alt="Profile" />
              <div className="text-sm">
                <h3 className="font-bold">John Doe</h3>
                <p className="text-black/50">johndoe@example.com</p>
              </div>
            </div>
          </div>
        </div>
        </nav>

        {/* Mobile Navbar */}
        <nav className="block md:hidden bg-gray-800 text-white p-1">
          <button
            className="p-2 focus:outline-none"
            onClick={() => setShowMenu(!showMenu)}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
          {showMenu && (
          <div className="bg-white text-black p-4 fixed inset-0 z-20 md:hidden h-full" style={{ 'zIndex': 20 }}>
            <div className="flex flex-col space-y-4">
              <button
                className="p-2 focus:outline-none self-end"
                onClick={() => setShowMenu(false)}>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
              <a href="#" className="p-2 text-sm block hover:bg-gray-200 rounded">
                Reports
              </a>
              <a href="#" className="p-2 text-sm block hover:bg-gray-200 rounded">
                Library
              </a>
              <a href="#" className="p-2 text-sm block hover:bg-gray-200 rounded">
                People
              </a>
              <a href="#" className="p-2 text-sm block hover:bg-gray-200 rounded">
                Activities
              </a>
              <a href="#" className="p-2 text-sm block hover:bg-gray-200 rounded">
                Get Started
              </a>
              <a href="#" className="p-2 text-sm block hover:bg-gray-200 rounded">
                Settings
              </a>
            </div>
          </div>
        )}

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
