import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@bss-ds/ui";

const meta: Meta<typeof Button> = {
  title: "Form/Button",
  component: Button,
  argTypes: {
    variant: { control: "select", options: ["primary", "dark", "sky", "white"] },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { variant: "primary", children: "신청하기" } };
export const Dark: Story = { args: { variant: "dark", children: "자세히 보기" } };
export const Sky: Story = { args: { variant: "sky", children: "취소" } };
export const White: Story = {
  args: { variant: "white", children: "로그인" },
  parameters: { backgrounds: { default: "primary" } },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <Button variant="primary">primary</Button>
      <Button variant="dark">dark</Button>
      <Button variant="sky">sky</Button>
      <Button variant="white">white</Button>
    </div>
  ),
};
