'use client';

import { Button, Group, Stack, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';

export default function Page() {
  const form = useForm({
    mode: 'uncontrolled',
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email')
    }
  });

  const saveClient = async (values) => {
    console.log(values);
  };

  return (
    <>
      <Title>Clients</Title>

      <Title order={2}>Add New Client</Title>

      <form onSubmit={form.onSubmit(saveClient)}>
        <Stack mb="xl">
          <TextInput
            required
            description="Client name or company"
            // name="name"
            key={form.key('name')}
            {...form.getInputProps('name')}
          />

          <TextInput
            required
            label="E-mail"
            placeholder="name@foo.com"
            key={form.key('email')}
            {...form.getInputProps('email')}
          />

          <TextInput
            required
            label="Phone"
            placeholder="+51 9 388 123 4567"
            key={form.key('phone')}
            {...form.getInputProps('phone')}
          />
        </Stack>

        <Group>
          <Button type="submit">Save Client</Button>
        </Group>
      </form>
    </>
  );
}
