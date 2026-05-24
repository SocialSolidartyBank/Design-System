import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@bss-ds/ui";

const meta: Meta<typeof Input> = {
  title: "Form/Input",
  component: Input,
};
export default meta;

type Story = StoryObj<typeof Input>;

const Wrap = (children: React.ReactNode) => <div style={{ width: 360 }}>{children}</div>;

export const Default: Story = { render: () => Wrap(<Input placeholder="입력하세요" />) };
export const Email: Story = { render: () => Wrap(<Input type="email" placeholder="you@example.com" />) };
export const Invalid: Story = { render: () => Wrap(<Input aria-invalid defaultValue="not-an-email" />) };
export const Disabled: Story = { render: () => Wrap(<Input disabled defaultValue="수정 불가" />) };
