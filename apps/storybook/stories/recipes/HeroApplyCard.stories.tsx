import type { Meta, StoryObj } from "@storybook/react";
import { HeroApplyCard } from "@bss-ds/recipes";
import { Field, Input, Checkbox } from "@bss-ds/ui";

const meta: Meta<typeof HeroApplyCard> = {
  title: "Recipes/HeroApplyCard",
  component: HeroApplyCard,
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof HeroApplyCard>;

export const Default: Story = {
  args: {
    title: "AI 동료와 함께 시작하기",
    description: "2025년 하반기 모집 중. 6주 과정.",
    submitLabel: "신청하기",
  },
  render: (args) => (
    <HeroApplyCard {...args}>
      <Field label="이름" required><Input name="name" placeholder="홍길동" /></Field>
      <Field label="이메일" required><Input name="email" type="email" placeholder="you@example.com" /></Field>
      <Checkbox label="개인정보 수집 및 이용에 동의합니다" name="agree" />
    </HeroApplyCard>
  ),
};

export const ShortForm: Story = {
  args: {
    title: "사전 신청",
    submitLabel: "알림 받기",
  },
  render: (args) => (
    <HeroApplyCard {...args}>
      <Field label="이메일"><Input type="email" /></Field>
    </HeroApplyCard>
  ),
};
