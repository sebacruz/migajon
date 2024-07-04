import { List, ListItem, Title, rem } from '@mantine/core';
import { IconAt, IconCategory, IconPhone, IconRulerMeasure } from '@tabler/icons-react';
import { getResource } from 'apps/frontend/src/utils/api';
import { notFound } from 'next/navigation';

const getData = async (id) => {
  try {
    return await getResource(class Supply {}, id);
  } catch (error) {
    if (error.response.status) {
      notFound();
    }

    throw error;
  }
};

export default async function Page({ params }: { params: { id: string } }) {
  const item = await getData(params.id);

  return (
    <>
      <Title order={2}>{item.name}</Title>

      <List>
        <ListItem
          icon={
            <IconCategory
              size="1rem"
              stroke={1.25}
              style={{ width: rem(16), height: rem(16) }}
            />
          }
        >
          {item.type}
        </ListItem>
        <ListItem
          icon={
            <IconRulerMeasure
              size="1rem"
              stroke={1.25}
              style={{ width: rem(16), height: rem(16) }}
            />
          }
        >
          {item.unit}
        </ListItem>
      </List>
    </>
  );
}
