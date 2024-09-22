import dayjs from "dayjs";
import {
  ActionColumnFormatter,
  ResumeColumnFormatter,
  TitleHeaderWithInfo,
} from "../formatters";

export const usage_history_columns = [
  {
    title: "Resumes",
    dataIndex: "resumes",
    key: "resumes",
    render: (item) => <ResumeColumnFormatter resumeData={item} />,
  },
  {
    title: "Action",
    dataIndex: "action_performed",
    key: "action_performed",
    render: (item) => <ActionColumnFormatter action={item} />,
  },
  {
    title: (
      <TitleHeaderWithInfo
        title="Input Tokens"
        tooltip_text="Input tokens are tokens that are given to an AI in order to explain the task to be performed."
      />
    ),
    dataIndex: "input_tokens",
    key: "input_tokens",
  },
  {
    title: (
      <TitleHeaderWithInfo
        title="Output Tokens"
        tooltip_text="Output tokens are tokens that an AI returns after performing the task."
      />
    ),
    dataIndex: "output_tokens",
    key: "output_tokens",
  },
  {
    title: (
      <TitleHeaderWithInfo
        title="Total Tokens Consumed"
        tooltip_text="This is the sum of Input and Output tokens."
      />
    ),
    dataIndex: "total_tokens",
    key: "total_tokens",
  },
  {
    title: "Dated",
    dataIndex: "created_at",
    key: "created_at",
    render: (item) => dayjs(item).format("DD MMM YYYY : hh:mm A"),
  },
];
