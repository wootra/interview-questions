'use client';

import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { UserInfo } from './types';
import UserList from './UserList';
import styles from './UserInfoItem.module.css';
const getUsers = async ({
	limit,
	ageOver,
	ageUnder,
	occupation,
	school,
}: {
	limit: number;
	ageUnder?: string;
	ageOver?: string;
	occupation: string;
	school: string;
}) => {
	const queries = [
		`limit=${limit}`,
		ageOver ? `s-age-over=${ageOver}` : '',
		ageUnder ? `s-age-under=${ageUnder}` : '',
		occupation ? `s-occupation=${occupation}` : '',
		school ? `s-school=${school}` : '',
	]
		.filter(Boolean)
		.join('&');
	const response = await fetch(`/api/users?` + queries);
	const data = await response.json();
	return data.data as UserInfo[];
};

const addUsers = async (data: object) => {
	await fetch(`/api/users`, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	});
};
type InputType = { occupation?: string; school?: string; name: string; age: number };

const App = () => {
	const [limit, setLimit] = useState(3);
	const [ageOver, setAgeOver] = useState('');
	const [ageUnder, setAgeUnder] = useState('');
	const [occupation, setOccupation] = useState('');
	const [school, setSchool] = useState('');

	const query = useQuery({
		queryKey: ['users', limit, ageOver, ageUnder, occupation, school],
		queryFn: () => getUsers({ limit, ageOver, ageUnder, occupation, school }),
	});

	const { mutateAsync } = useMutation({
		mutationFn: addUsers,
	});
	const users = query.data as UserInfo[];
	const validation = (data: InputType) => {
		if (!data.name || !data.age) {
			alert('name and age is required');
			return false;
		}
		if (data.name.length < 3) {
			alert('name need to be more than 2 characters');
			return false;
		}
		if (data.age < 18) {
			alert('age should be 18 or older than 18');
			return false;
		}
		if (data.age > 100) {
			alert('please call us. We have a senior friendly service.');
			return false;
		}
		return true;
	};
	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		const formData = new FormData(form);
		const data = Object.fromEntries(formData.entries()) as unknown as InputType;
		if (!validation(data)) return;
		await mutateAsync(data);
		await query.refetch();
	};

	return (
		<div className={styles.app}>
			<div className={styles.search}>
				<h2>Search</h2>
				<label>
					User Load Limit:
					<input type='text' value={limit} onChange={e => setLimit(Number(e.target.value))} />
				</label>
				<label>
					Age Over:
					<input type='text' value={ageOver} onChange={e => setAgeOver(e.target.value)} />
				</label>

				<label>
					Age Under:
					<input type='text' value={ageUnder} onChange={e => setAgeUnder(e.target.value)} />
				</label>

				<label>
					Occupation: (Doctor, Nurse)
					<input type='text' value={occupation} onChange={e => setOccupation(e.target.value)} />
				</label>

				<label>
					School:
					<input type='text' value={school} onChange={e => setSchool(e.target.value)} />
				</label>
			</div>
			<form onSubmit={onSubmit}>
				<div className={styles.addNew}>
					<h2>Add new user</h2>
					<label>
						Name:
						<input type='text' name='name' />
					</label>
					<label>
						Age:
						<input type='number' name='age' />
					</label>
					<label>
						Occupation:
						<input type='text' name='occupation' />
					</label>
					<label>
						School:
						<input type='text' name='school' />
					</label>
				</div>
				<button type='submit'>Add New User</button>
			</form>
			<h1>Users</h1>

			{query.isLoading ? (
				'Loading...'
			) : query.isError ? (
				<span>Error: {query.error.message}</span>
			) : (
				<UserList users={users} />
			)}
		</div>
	);
};

export default App;
