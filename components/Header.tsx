'use client';

import Image from 'next/image';
import React from 'react';
import Avatar from 'react-avatar';
import TrelloLogo from '@/public/images/TrelloLogo.png';
import { MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/solid';

const trello_blue = '#0179BF';

function Header() {
  return (
    <header>
      <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl">
        <Image
          src={TrelloLogo}
          alt="Trello Logo"
          width={300}
          height={100}
          className="w-44 md:w-56 pb-10 sm:pb-0 object-contain"
        />
        <div className="flex items-center space-x-5 flex-1 justify-end w-full p-5">
          <form className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial">
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 outline-none p-2"
            />
            <button hidden></button>
          </form>
          <Avatar name="Tyler Farris" round size="50" color={trello_blue} />
        </div>
      </div>
      <div
        className="flex items-center justify-center px-5 py-2 md:py-2
      "
      >
        <p
          className={`flex items-center text-sm p-5 font-light pr-5 shadow-xl rounded-xl w-fit bg-white italic max-w-3xl text-[${trello_blue}]`}
        >
          <UserCircleIcon
            className={`inline-block h-10 w-10 text-[${trello_blue}] mr-1`}
          />
          GPT is summarizing your tasks for the day...
        </p>
      </div>
    </header>
  );
}

export default Header;
