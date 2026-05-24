import type { Meta, StoryObj } from "@storybook/react";
import { FullCardSection } from "@bss-ds/recipes";

const meta: Meta<typeof FullCardSection> = {
  title: "Recipes/FullCardSection",
  component: FullCardSection,
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof FullCardSection>;

export const Default: Story = {
  args: {
    emphasis: "AI는",
    title: "동료입니다",
    children:
      "대체재가 아니라 함께 일하는 동료. 이 프로그램은 그 협업을 가르칩니다.",
  },
};

export const TitleOnly: Story = {
  args: {
    title: "함께 만드는 세상",
  },
};
