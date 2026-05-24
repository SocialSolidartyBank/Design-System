import type { Meta, StoryObj } from "@storybook/react";
import { Fieldset, Field, Input } from "@bss-ds/ui";

const meta: Meta<typeof Fieldset> = {
  title: "Form/Fieldset",
  component: Fieldset,
};
export default meta;

type Story = StoryObj<typeof Fieldset>;

export const WithLegend: Story = {
  args: { legend: "신청 정보" },
  render: (args) => (
    <Fieldset {...args}>
      <Field label="이름"><Input /></Field>
      <Field label="이메일"><Input type="email" /></Field>
    </Fieldset>
  ),
};

export const NoLegend: Story = {
  render: () => (
    <Fieldset>
      <Field label="이름"><Input /></Field>
      <Field label="전화"><Input type="tel" /></Field>
    </Fieldset>
  ),
};
