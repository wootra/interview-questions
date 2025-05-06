import React from 'react';
import { UserInfo } from './types';
import styles from './UserInfoItem.module.css';

const UserInfoItem = ({ user }: { user: UserInfo }) => {
	const { name, age, occupation, school } = user;
	return (
		<div className={styles.userInfo}>
			<div className={styles.item}>
				<span className={styles.label}>Name</span>
				<span className={styles.value}>{name}</span>
			</div>
			<div className={styles.item}>
				<span className={styles.label}>Age</span>
				<span className={styles.value}>{age}</span>
			</div>
			<div className={styles.item}>
				<span className={styles.label}>Occupation</span>
				<span className={styles.value}>{occupation.title}</span>
			</div>
			<div className={styles.item}>
				<span className={styles.label}>School</span>
				<span className={styles.value}>{school.name}</span>
			</div>
		</div>
	);
};

export default UserInfoItem;
