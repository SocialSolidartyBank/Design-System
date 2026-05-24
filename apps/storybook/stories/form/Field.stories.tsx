import type { Meta, StoryObj } from "@storybook/react";
import { Field, Input } from "@bss-ds/ui";

const meta: Meta<typeof Field> = {
  title: "Form/Field",
  component: Field,
};
export default meta;

type Story = StoryObj<typeof Field>;

export const Basic: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Field label="이름"><Input placeholder="홍길동" /></Field>
    </div>
  ),
};

export const WithHelper: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Field label="이메일" helper="기관 메일을 사용해 주세요"><Input type="email" /></Field>
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Field label="이메일" error="유효한 이메일 형식이 아닙니다"><Input type="email" defaultValue="not-an-email" /></Field>
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Field label="신청자 이름" required><Input /></Field>
    </div>
  ),
};
