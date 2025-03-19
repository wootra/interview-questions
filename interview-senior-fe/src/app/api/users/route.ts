import { NextRequest } from 'next/server';
type UserInfoInput = { occupation?: string; school?: string; name: string; age: number };
type UserInfoSchema = {
	id: number;
	occupation?: { code: string; label: string };
	school?: { code: string; label: string };
	name: string;
	age: number;
};
const tables = {
	nextIndex: 9,
	users: [
		{ id: 1, name: 'John Doe0', age: 39, occupation: { code: 'o1', label: 'Doctor' } },
		{ id: 2, name: 'John Doe1', age: 35, occupation: { code: 'o2', label: 'Nurse' } },
		{ id: 3, name: 'John Doe2', age: 32, occupation: { code: 'o1', label: 'Doctor' } },
		{ id: 4, name: 'John Doe3', age: 30, occupation: { code: 'o2', label: 'Nurse' } },
		{ id: 5, name: 'Jane Doe0', age: 42, school: { code: 's1', label: 'Harvard' } },
		{ id: 6, name: 'Jane Doe1', age: 25, school: { code: 's2', label: 'Yeil' } },
		{ id: 7, name: 'Jane Doe2', age: 22, school: { code: 's3', label: 'MIT' } },
		{ id: 8, name: 'Jane Doe3', age: 15, school: { code: 's1', label: 'Harvard' } },
	] as UserInfoSchema[],
};

export async function POST(request: NextRequest) {
	const data = await request.json();
	console.log('data', data);
	const nextIndex = tables.nextIndex++;
	const { occupation: occupationSrc, school: schoolSrc, name = 'unknown', age = 0 } = data as UserInfoInput;
	const occupation = occupationSrc
		? {
				occupation: {
					code: 'c1',
					label: occupationSrc,
				},
		  }
		: {};

	const school = schoolSrc
		? {
				school: {
					code: 'c1',
					label: schoolSrc,
				},
		  }
		: {};
	const newData: UserInfoSchema = { id: nextIndex, name, age: Number(age), ...occupation, ...school };
	tables.users = [...tables.users, newData];
	await new Promise(resolve => setTimeout(resolve, 3000));
	return Response.json({ data: newData });
}

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const limit = Number(searchParams.get('limit') ?? '3');
	const searchAgeOver = searchParams.get('s-age-over') ?? '';
	const searchAgeUnder = searchParams.get('s-age-under') ?? '';
	const searchOccupation = searchParams.get('s-occupation') ?? '';
	const searchSchool = searchParams.get('s-school') ?? '';
	let filtered = tables.users;
	if (searchAgeOver) {
		filtered = filtered.filter(user => user.age >= Number(searchAgeOver));
	}
	if (searchAgeUnder) {
		filtered = filtered.filter(user => user.age <= Number(searchAgeUnder));
	}
	if (searchOccupation) {
		filtered = filtered.filter(user =>
			user.occupation?.label.toLowerCase().includes(searchOccupation.toString().toLowerCase())
		);
	}
	if (searchSchool) {
		filtered = filtered.filter(user =>
			user.school?.label.toLowerCase().includes(searchSchool.toString().toLowerCase())
		);
	}
	await new Promise(resolve => setTimeout(resolve, 3000));
	return Response.json({ data: filtered.reverse().slice(0, limit) });
}
