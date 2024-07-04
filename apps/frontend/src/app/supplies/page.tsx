'use client';

import {
  ActionIcon,
  Group,
  Skeleton,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  Title,
  Text,
  rem
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { deleteResource, getAllResources } from '../../utils/api';
import { IconEye, IconPencil, IconTrash } from '@tabler/icons-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Page() {
  const [items, setItems] = useState();
  const [loading, setLoading] = useState(true);

  async function getItems() {
    const items = await getAllResources(class Supply {});

    setItems(items);
    setLoading(false);
  }

  useEffect(() => {
    getItems();
  }, []);

  const deleteItem = async (item) => {
    modals.openConfirmModal({
      title: 'Delete client',
      centered: true,
      children: (
        <>
          <Text mb={'md'} size="sm">
            Are you sure you want to delete this supply?
          </Text>

          <Text fw="bold" size="sm">
            This action is destructive and you will have to contact support to
            restore your data.
          </Text>
        </>
      ),
      labels: { confirm: 'Delete supply', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      // onCancel: () => console.log('Cancel'),
      onConfirm: async () => {
        await deleteResource(item);
        await getItems();
      }
    });
  };

  return (
    <>
      <Table>
        <TableThead>
          <TableTr>
            <TableTh>#</TableTh>
            <TableTh>Name</TableTh>
            <TableTh>Type</TableTh>
            <TableTh>Unit</TableTh>
            <TableTh></TableTh>
          </TableTr>
        </TableThead>

        <TableTbody>
          {loading && (
            <>
              <TableTr>
                <TableTd colSpan={5}>
                  <Skeleton>Loading...</Skeleton>
                </TableTd>
              </TableTr>
              <TableTr>
                <TableTd colSpan={5}>
                  <Skeleton>Loading...</Skeleton>
                </TableTd>
              </TableTr>
              <TableTr>
                <TableTd colSpan={5}>
                  <Skeleton>Loading...</Skeleton>
                </TableTd>
              </TableTr>
              <TableTr>
                <TableTd colSpan={5}>
                  <Skeleton>Loading...</Skeleton>
                </TableTd>
              </TableTr>
              <TableTr>
                <TableTd colSpan={5}>
                  <Skeleton>Loading...</Skeleton>
                </TableTd>
              </TableTr>
            </>
          )}
          {items &&
            items.map((item) => {
              return (
                <TableTr key={item.id}>
                  <TableTd>{item.id}</TableTd>
                  <TableTd>{item.name}</TableTd>
                  <TableTd>{item.type}</TableTd>
                  <TableTd>{item.unit}</TableTd>
                  <TableTd>
                    <Group gap={0} justify="flex-end">
                      <ActionIcon
                        variant="subtle"
                        color="gray"
                        component={Link}
                        href={`/clients/${item.id}`}
                      >
                        <IconEye
                          style={{ width: rem(16), height: rem(16) }}
                          stroke={1.5}
                        />
                      </ActionIcon>

                      <ActionIcon
                        variant="subtle"
                        color="red"
                        onClick={() => deleteItem(item)}
                      >
                        <IconTrash
                          style={{ width: rem(16), height: rem(16) }}
                          stroke={1.5}
                        />
                      </ActionIcon>
                    </Group>
                  </TableTd>
                </TableTr>
              );
            })}
        </TableTbody>
      </Table>
    </>
  );
}
