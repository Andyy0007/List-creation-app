// src/hooks/useListApi.js
import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://apis.ccbp.in/list-creation/lists";

export default function useListApi() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("idle"); // 'loading' | 'success' | 'failure'

  const fetchLists = async () => {
    setStatus("loading");
    try {
      const res = await axios.get(API_URL);
      setData(res.data.lists);
      setStatus("success");
    } catch {
      setStatus("failure");
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  return { data, status, fetchLists };
}
