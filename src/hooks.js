import { useState, useEffect, useCallback } from 'react';

import axios from 'axios';

import { API_URL } from './constants/url';

function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchUrl() {
    const response = await fetch(url);
    const json = await response.json();

    setData(json);
    setLoading(false);
  }

  useEffect(() => {
    fetchUrl();
  }, []);

  return [data, loading];
}

const usePostData = ({ url, data, params }, callback = async (res) => {}) => {
  const [res, setRes] = useState({ data: null, error: null, isLoading: false });

  const callAPI = useCallback(async () => {
    setRes(prevState => ({ ...prevState, isLoading: true }));

    let res = await axios({
      method: 'POST',
      url,
      data,
      params,
      headers: {}
    });

    await setRes({ data: res.data, isLoading: false, error: null });
    await callback(res);
  }, [url, data, params]);

  return [res, callAPI];
}

export { useFetch, usePostData };