import fetchSuggestion from '@/lib/fetchSuggestion';
import { useBoardStore } from '@/store/BoardStore';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react';

function GPTLoadingBlurb() {
  const [board] = useBoardStore((state) => [state.board]);

  const [loading, setLoading] = useState<boolean>(false);
  const [suggestion, setSuggestion] = useState<string>('');

  useEffect(() => {
    if (board.columns.size === 0) return;
    setLoading(true);

    const fetchSuggestionsFunc = async () => {
      const suggestions = await fetchSuggestion(board);
      setSuggestion(suggestions);
      setLoading(false);
    };

    fetchSuggestionsFunc();
  }, [board]);
  return (
    <div
      className="flex items-center justify-center px-5 py-2 md:py-2
      "
    >
      <p
        className={`flex items-center text-sm p-5 font-light pr-5 shadow-xl rounded-xl w-fit bg-white italic max-w-3xl trello_color`}
      >
        <UserCircleIcon
          className={`inline-block h-10 w-10 trello_color mr-1 ${
            loading && 'animate-spin'
          }`}
        />
        {suggestion && !loading
          ? suggestion
          : 'GPT is summarizing your tasks for the day...'}
      </p>
    </div>
  );
}

export default GPTLoadingBlurb;
