'use client';

import React from 'react';
import { UserInfo } from './types';
import UserInfoItem from './UserInfoItem';

const UserList = ({ users }: { users: UserInfo[] }) => {
	return (
		<ul>
			{users.map(user => (
				<UserInfoItem key={user.id} user={user} />
			))}
		</ul>
	);
};

export default UserList;
