import { Select } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { searchHackerNews } from 'src/services';

import StyledSearch from './StyledSearch';

const { Option } = Select;

function Search() {
  const router = useRouter();

  const [searchText, setSearchText] = useState('');
  const [options, setOptions] = useState([]);
  //use down below state to manage error and loading state
  // eslint-disable-next-line no-unused-vars
  const [status, setStatus] = useState({});

  function handleChange(value) {
    setSearchText(value);
  }
  async function handleSearch(value) {
    if (value) {
      setStatus({ loading: true });
      //add debouncing here for less api call
      const newOptions = await searchHackerNews(value);
      if (newOptions?.error) {
        //we will set our error here
      } else {
        setOptions(newOptions?.res?.hits);
      }
    }
  }
  function handleSelect(value) {
    router.push(`details/${value}`);
  }
  return (
    <>
      <h1>Search for hacker news </h1>
      <StyledSearch
        showSearch
        value={searchText}
        defaultActiveFirstOption
        showArrow={false}
        filterOption={false}
        onSearch={handleSearch}
        onChange={handleChange}
        onSelect={handleSelect}
        notFoundContent={null}
      >
        {options?.map(option => (
          <Option key={option.objectID}>
            <>
              Title: {option.title}
              <br />
              Author: {option.author}
            </>{' '}
          </Option>
        ))}
      </StyledSearch>
    </>
  );
}

export default Search;
