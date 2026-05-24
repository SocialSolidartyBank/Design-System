import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "@bss-ds/ui";

const meta: Meta<typeof Checkbox> = {
  title: "Form/Checkbox",
  component: Checkbox,
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Unchecked: Story = { args: { label: "동의합니다" } };
export const Checked: Story = { args: { label: "동의합니다", defaultChecked: true } };
export const Disabled: Story = { args: { label: "비활성", disabled: true, defaultChecked: true } };
