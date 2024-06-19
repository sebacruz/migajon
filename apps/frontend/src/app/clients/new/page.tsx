'use client';

import { Alert, Button, Group, Stack, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { createResource } from '../../../utils/api';
import { useState } from 'react';
import { IconInfoCircle } from '@tabler/icons-react';

export default function Page() {
  const form = useForm({
    mode: 'uncontrolled',
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      phone: (value) =>
        /^(?:\+54\s?)?(\(?\d{2,4}\)?)?[\s.-]?\d{2,4}[\s.-]?\d{4,8}$/.test(value)
          ? null
          : 'Invalid phone number'
    }
  });

  const router = useRouter();
  const [hasError, setHasError] = useState(false);

  const saveClient = async ({ name, email, phone } = values) => {
    const clientData = new (class Client {
      name: string = name;
      email: string = email;
      phone: string = phone;
    })();

    try {
      const client = await createResource(clientData);

      return router.push(`/clients/${client.id}`);
    } catch (error) {
      return setHasError(true);
    }
  };

  return (
    <>
      <Title>Clients</Title>

      <Title order={2}>Add New Client</Title>

      {hasError && (
        <Alert
          variant="light"
          color="red"
          title="An error has occurred"
          mb="xl"
          icon={<IconInfoCircle />}
        >
          An error occurred while saving the new client. Please try again.
        </Alert>
      )}

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
