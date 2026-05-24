import type { Meta, StoryObj } from "@storybook/react";
import { CheckGroup, Checkbox } from "@bss-ds/ui";

const meta: Meta<typeof CheckGroup> = {
  title: "Form/CheckGroup",
  component: CheckGroup,
  argTypes: {
    orientation: { control: "radio", options: ["vertical", "horizontal"] },
  },
};
export default meta;

type Story = StoryObj<typeof CheckGroup>;

export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <CheckGroup {...args}>
      <Checkbox label="AI 동료와 함께 일하기" name="t" value="ai" />
      <Checkbox label="새로운 도구 학습" name="t" value="tools" />
      <Checkbox label="커뮤니티 활동" name="t" value="community" />
    </CheckGroup>
  ),
};

export const Horizontal: Story = {
  args: { orientation: "horizontal" },
  render: (args) => (
    <CheckGroup {...args}>
      <Checkbox label="월" name="d" value="mon" />
      <Checkbox label="수" name="d" value="wed" />
      <Checkbox label="금" name="d" value="fri" />
    </CheckGroup>
  ),
};
