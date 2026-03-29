import { useState } from 'react';
import {
  Breadcrumb,
  Typography,
  Card,
  Table,
  Tabs,
  DatePicker,
  Select,
  Space,
  Tag,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import dayjs, { Dayjs } from 'dayjs';
import { getLogs } from '../../features/reports/api';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const ACTION_COLORS: Record<string, string> = {
  CREATE: 'green',
  UPDATE: 'blue',
  DELETE: 'red',
};

const ENTITY_OPTIONS = [
  { label: 'All Entities', value: '' },
  { label: 'Student', value: 'student' },
  { label: 'Lead', value: 'lead' },
  { label: 'Group', value: 'group' },
  { label: 'Payment', value: 'payment' },
  { label: 'Attendance', value: 'attendance' },
  { label: 'Teacher', value: 'teacher' },
  { label: 'Course', value: 'course' },
];

interface LogRow {
  id: number;
  dateTime: string;
  staffName: string;
  action: string;
  entity: string;
  details: string;
}

const LogsTab: React.FC = () => {
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | null>(null);
  const [staff, setStaff] = useState<string>('');
  const [entityType, setEntityType] = useState<string>('');

  const params: Record<string, string> = {};
  if (dateRange) {
    params.startDate = dateRange[0].format('YYYY-MM-DD');
    params.endDate = dateRange[1].format('YYYY-MM-DD');
  }
  if (staff) params.staffId = staff;
  if (entityType) params.entity = entityType;

  const { data, isLoading } = useQuery({
    queryKey: ['logs', params],
    queryFn: () => getLogs(params),
  });

  const rawRows: any[] = data?.data ?? data ?? [];

  const rows: LogRow[] = rawRows.map((item: any) => ({
    id: item.id,
    dateTime: item.createdAt
      ? dayjs(item.createdAt).format('YYYY-MM-DD HH:mm')
      : item.dateTime ?? '-',
    staffName: item.staffName ?? item.staff?.name ?? '-',
    action: item.action ?? '-',
    entity: item.entity ?? item.entityType ?? '-',
    details: item.details ?? item.description ?? '-',
  }));

  const columns: ColumnsType<LogRow> = [
    {
      title: 'Date/Time',
      dataIndex: 'dateTime',
      key: 'dateTime',
      width: 160,
      sorter: (a, b) => a.dateTime.localeCompare(b.dateTime),
    },
    { title: 'Staff Name', dataIndex: 'staffName', key: 'staffName', width: 160 },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: 110,
      render: (val: string) => (
        <Tag color={ACTION_COLORS[val?.toUpperCase()] ?? 'default'}>
          {val?.toUpperCase()}
        </Tag>
      ),
    },
    { title: 'Entity', dataIndex: 'entity', key: 'entity', width: 120 },
    { title: 'Details', dataIndex: 'details', key: 'details' },
  ];

  return (
    <>
      <Card style={{ marginBottom: 16 }}>
        <Space wrap size="middle">
          <RangePicker
            value={dateRange}
            onChange={(values) =>
              setDateRange(values as [Dayjs, Dayjs] | null)
            }
            allowClear
          />
          <Select
            style={{ width: 180 }}
            placeholder="Staff"
            value={staff || undefined}
            onChange={(val) => setStaff(val ?? '')}
            allowClear
            options={[{ label: 'All Staff', value: '' }]}
          />
          <Select
            style={{ width: 180 }}
            placeholder="Entity Type"
            value={entityType || undefined}
            onChange={(val) => setEntityType(val ?? '')}
            allowClear
            options={ENTITY_OPTIONS}
          />
        </Space>
      </Card>
      <Table<LogRow>
        columns={columns}
        dataSource={rows}
        loading={isLoading}
        rowKey="id"
        pagination={{ pageSize: 20, showSizeChanger: true }}
        scroll={{ x: 800 }}
      />
    </>
  );
};

const PlaceholderTab: React.FC<{ name: string }> = ({ name }) => (
  <Card>
    <div style={{ textAlign: 'center', padding: 48 }}>
      <Text type="secondary" style={{ fontSize: 16 }}>
        {name} &mdash; Coming Soon
      </Text>
    </div>
  </Card>
);

const LogsPage: React.FC = () => {
  const { t } = useTranslation();

  const tabItems = [
    {
      key: 'logs',
      label: 'Logs',
      children: <LogsTab />,
    },
    {
      key: 'workly',
      label: 'Workly Report',
      children: <PlaceholderTab name="Workly Report" />,
    },
    {
      key: 'sms',
      label: 'Sent SMS',
      children: <PlaceholderTab name="Sent SMS" />,
    },
    {
      key: 'calls',
      label: 'Call Log',
      children: <PlaceholderTab name="Call Log" />,
    },
  ];

  return (
    <>
      <Breadcrumb
        items={[{ title: 'Reports' }, { title: 'Logs' }]}
        style={{ marginBottom: 16 }}
      />
      <Title level={2}>{t('pages.logs')}</Title>
      <Tabs defaultActiveKey="logs" items={tabItems} />
    </>
  );
};

export default LogsPage;
