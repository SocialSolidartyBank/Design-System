import type { Meta, StoryObj } from "@storybook/react";
import { ErrorText } from "@bss-ds/ui";

const meta: Meta<typeof ErrorText> = {
  title: "Form/ErrorText",
  component: ErrorText,
};
export default meta;

type Story = StoryObj<typeof ErrorText>;

export const Default: Story = { args: { children: "이 필드는 필수입니다" } };
