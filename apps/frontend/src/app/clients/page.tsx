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
  const [clients, setClients] = useState();
  const [loading, setLoading] = useState(true);

  async function getClients() {
    const clients = await getAllResources(class Client {});

    setClients(clients);
    setLoading(false);
  }

  useEffect(() => {
    // async function getClients() {
    //   const clients = await getAllResources(class Client {});

    //   setClients(clients);
    //   setLoading(false);
    // }

    getClients();
  }, []);

  const confirmDeleteClient = () =>
    modals.openConfirmModal({
      title: 'Delete client',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete this client? This action is
          destructive and you will have to contact support to restore your data.
        </Text>
      ),
      labels: { confirm: 'Delete account', cancel: "No don't delete it" },
      confirmProps: { color: 'red' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => console.log('Confirmed')
    });

  const deleteClient = async (client) => {
    modals.openConfirmModal({
      title: 'Delete client',
      centered: true,
      children: (
        <>
          <Text mb={'md'} size="sm">
            Are you sure you want to delete this client?
          </Text>

          <Text fw="bold" size="sm">
            This action is destructive and you will have to contact support to
            restore your data.
          </Text>
        </>
      ),
      labels: { confirm: 'Delete client', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      // onCancel: () => console.log('Cancel'),
      onConfirm: async () => {
        await deleteResource(client);
        await getClients();
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
            <TableTh>Email</TableTh>
            <TableTh>Phone</TableTh>
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
          {clients &&
            clients.map((client) => {
              return (
                <TableTr key={client.id}>
                  <TableTd>{client.id}</TableTd>
                  <TableTd>{client.name}</TableTd>
                  <TableTd>{client.email}</TableTd>
                  <TableTd>{client.phone}</TableTd>
                  <TableTd>
                    <Group gap={0} justify="flex-end">
                      <ActionIcon
                        variant="subtle"
                        color="gray"
                        component={Link}
                        href={`/clients/${client.id}`}
                      >
                        <IconEye
                          style={{ width: rem(16), height: rem(16) }}
                          stroke={1.5}
                        />
                      </ActionIcon>

                      <ActionIcon
                        variant="subtle"
                        color="red"
                        onClick={() => deleteClient(client)}
                        // onClick={confirmDeleteClient}
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
