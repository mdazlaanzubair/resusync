import React, { useEffect, useState } from "react";
import { Input, Table } from "antd";

import { getAIUsage } from "@/redux/report/actions";
import { usage_history_columns } from "./table-columns";
import { useDispatch, useSelector } from "react-redux";
import { IoSearch } from "react-icons/io5";

const UsageTable = ({ isLoading }) => {
  const dispatch = useDispatch();
  const { llmConfigs } = useSelector((state) => state.llmConfig);
  const { usage } = useSelector((state) => state.report);
  const { entriesPerPage, data, currentPage, totalEntries } = usage;

  // STATE TO TELL NEW PAGE CONTENT LOADING
  const [newPageDataLoad, setNewPageDataLoad] = useState(false);

  // SEARCH KEYWORD and FILTER STATE
  const [searchWord, setSearchWord] = useState("");
  const [filteredData, setFilteredData] = useState([...data]);

  // TO FETCH DATA FROM SUPABASE IN PAGINATION WE NEED TO PROVIDE A RANGE
  // STARTING INDEX AND ENDING INDEX (from & to)
  const getRange = (page) => {
    let from = page * entriesPerPage;

    // EXECUTING THIS BLOCK FOR PAGES GREATER THAN 0
    // IN ORDER TO AVOID THE OVERLAPPING OF DATA BETWEEN
    // THE PAGES
    if (page > 0) {
      from += 1;
    }

    return {
      from, // STARTING POINT
      to: from + entriesPerPage, // ENDING POINT
    };
  };

  // FUNCTION TO FETCH USAGE DATA FROM SUPABASE
  const fetchUsageData = (page) => {
    if (llmConfigs && llmConfigs?.id) {
      setNewPageDataLoad(true);
      const range = getRange(page);
      const callback = () => setNewPageDataLoad(false);
      dispatch(getAIUsage(llmConfigs?.id, page, range, callback));
    }
  };

  // FUNCTION TO TRIGGER ON PAGE CHANGE AND FETCH DTA OF THE PAGE
  const handleTableChange = (pagination) => {
    const { current } = pagination;
    fetchUsageData(current - 1);
  };

  // PERFORMING SIDE EFFECT ON KEYWORD CHANGE TO FILTER THE DATA
  useEffect(() => {
    if (searchWord?.length) {
      const lowerCaseSearch = searchWord.toLowerCase();

      const filtered = data?.filter((item) => {
        const isActionMatched = item.action_performed
          ?.toLowerCase()
          .includes(lowerCaseSearch);

        const isTitleMatched = item.resumes?.title
          ?.toLowerCase()
          .includes(lowerCaseSearch);

        return isActionMatched || isTitleMatched;
      });

      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [searchWord, data]);

  return (
    <div className="flex flex-col items-end gap-3">
      <Input
        className="w-full lg:w-3/12"
        size="large"
        prefix={<IoSearch className="text-black/70 mr-1" />}
        placeholder="Search by resume or action..."
        onChange={(e) => setSearchWord(e.target.value)}
      />

      <Table
        className="w-full"
        columns={usage_history_columns}
        dataSource={filteredData}
        loading={isLoading || newPageDataLoad}
        onChange={handleTableChange}
        pagination={{
          current: currentPage,
          pageSize: entriesPerPage,
          total: totalEntries, // total entries from Supabase
        }}
      />
    </div>
  );
};

export default UsageTable;
