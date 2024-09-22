import { getAIUsage } from "@/redux/report/actions";
import React, { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UsageTable } from "./components";
import { Select } from "antd";
import { reportActions } from "@/redux/report/slice";

const UsageHistory = () => {
  const dispatch = useDispatch();
  const { llmConfigs } = useSelector((state) => state.llmConfig);
  const { usage } = useSelector((state) => state.report);
  const { entriesPerPage } = usage;

  const [isLoading, setIsLoading] = useState(false);

  // FUNCTION TO FETCH USAGE DATA FROM SUPABASE
  const fetchUsageData = () => {
    if (llmConfigs && llmConfigs?.id) {
      setIsLoading(true);
      const range = {
        from: 0,
        to: entriesPerPage,
      };
      const callback = () => setIsLoading(false);
      dispatch(getAIUsage(llmConfigs?.id, 0, range, callback));
    }
  };

  useLayoutEffect(() => {
    fetchUsageData();
  }, [llmConfigs]);

  const handleChange = (value) => {
    dispatch(reportActions.setEntriesPerPage(value));
  };

  return (
    <div className="relative w-full h-full">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-lg mb-5">AI Usage History</h1>
        <Select
          style={{
            width: 120,
          }}
          onChange={handleChange}
          defaultValue={entriesPerPage}
          options={[
            {
              value: 5,
              label: "Default",
            },
            {
              value: 10,
              label: "10 entries per page",
            },
            {
              value: 50,
              label: "50 entries per page",
            },
            {
              value: 100,
              label: "100 entries per page",
            },
          ]}
        />
      </div>

      <UsageTable isLoading={isLoading} />
    </div>
  );
};

export default UsageHistory;
