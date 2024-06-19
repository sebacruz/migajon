import { List, ListItem, Title, rem } from '@mantine/core';
import { IconAt, IconPhone } from '@tabler/icons-react';
import { getResource } from 'apps/frontend/src/utils/api';
import { notFound } from 'next/navigation';

const getData = async (id) => {
  try {
    return await getResource(class Client {}, id);
  } catch (error) {
    if (error.response.status) {
      notFound();
    }

    throw error;
  }
};

export default async function Page({ params }: { params: { id: string } }) {
  const client = await getData(params.id);

  return (
    <>
      <Title order={2}>{client.name}</Title>

      <List>
        <ListItem
          icon={
            <IconAt
              size="1rem"
              stroke={1.25}
              style={{ width: rem(16), height: rem(16) }}
            />
          }
        >
          {client.email}
        </ListItem>
        <ListItem
          icon={
            <IconPhone
              size="1rem"
              stroke={1.25}
              style={{ width: rem(16), height: rem(16) }}
            />
          }
        >
          {client.phone}
        </ListItem>
      </List>
    </>
  );
}
