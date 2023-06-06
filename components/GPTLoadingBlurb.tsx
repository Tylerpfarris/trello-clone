import { UserCircleIcon } from '@heroicons/react/24/solid';
import React from 'react';

function GPTLoadingBlurb() {
  return (
    <div
      className="flex items-center justify-center px-5 py-2 md:py-2
      "
    >
      <p
        className={`flex items-center text-sm p-5 font-light pr-5 shadow-xl rounded-xl w-fit bg-white italic max-w-3xl trello_color`}
      >
        <UserCircleIcon
          className={`inline-block h-10 w-10 trello_color mr-1`}
        />
        GPT is summarizing your tasks for the day...
      </p>
    </div>
  );
}

export default GPTLoadingBlurb;
