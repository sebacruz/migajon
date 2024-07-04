'use client';

import {
  Button,
  Group,
  NativeSelect,
  Stack,
  TextInput,
  Title
} from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { createResource } from 'apps/frontend/src/utils/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
  const form = useForm({
    mode: 'uncontrolled',
    validate: {
      name: isNotEmpty('Name cannot be empty'),
      type: isNotEmpty('Type cannot be empty'),
      unit: isNotEmpty('Unit cannot be empty')
    }
  });

  const router = useRouter();
  const [hasError, setHasError] = useState(false);

  const saveItem = async ({ name, type, unit } = values) => {
    const itemData = new (class Supply {
      name: string = name;
      type: string = type;
      unit: string = unit;
    })();

    try {
      const item = await createResource(itemData);

      return router.push(`/supplies/${item.id}`);
    } catch (error) {
      return setHasError(true);
    }
  };

  return (
    <>
      <Title order={2}>Add New Supply</Title>

      <form onSubmit={form.onSubmit(saveItem)}>
        <Stack mb="xl">
          <TextInput
            required
            label="Name"
            key={form.key('name')}
            {...form.getInputProps('name')}
          />

          <NativeSelect
            required
            label="Type"
            key={form.key('type')}
            data={[
              '',
              'FLOUR',
              'EGG',
              'FAT',
              'YEAST',
              'SUGAR',
              'SALT',
              'MILK',
              'WATER',
              'BUTTER',
              'MARGARINE',
              'OIL',
              'COLORANT',
              'ESSENCE',
              'FRUIT',
              'CHOCOLATE',
              'NUTS',
              'SEEDS',
              'OTHER'
            ]}
            {...form.getInputProps('type')}
          />

          <NativeSelect
            required
            label="Unit"
            key={form.key('unit')}
            data={['', 'KG', 'G', 'LITER', 'ML', 'UNIT', 'BOX', 'PACKAGE']}
            {...form.getInputProps('unit')}
          />
        </Stack>

        <Group>
          <Button type="submit">Save Client</Button>
        </Group>
      </form>
    </>
  );
}
