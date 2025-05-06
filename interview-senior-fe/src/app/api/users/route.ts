import { NextRequest } from "next/server";
type UserInfoInput = { occupation?: string; school?: string; name: string; age: number };
type UserInfoSchema = {
  id: number;
  occupation?: { code: string; title: string };
  school?: { code: string; name: string };
  name: string;
  age: number;
};
const obfuscatedUserData =
  "W3siaWQiOjEsIm5hbWUiOiJBbGljZSBTbWl0aCIsImFnZSI6MzksIm9jY3VwYXRpb24iOnsiY29kZSI6Im8xIiwidGl0bGUiOiJEb2N0b3IifX0seyJpZCI6MiwibmFtZSI6IkJvYiBKb2huc29uIiwiYWdlIjozNSwib2NjdXBhdGlvbiI6eyJjb2RlIjoibzIiLCJ0aXRsZSI6Ik51cnNlIn19LHsiaWQiOjMsIm5hbWUiOiJDaGFybGllIEJyb3duIiwiYWdlIjozMiwib2NjdXBhdGlvbiI6eyJjb2RlIjoibzEiLCJ0aXRsZSI6IkRvY3RvciJ9fSx7ImlkIjo0LCJuYW1lIjoiRGlhbmEgV2hpdGUiLCJhZ2UiOjMwLCJvY2N1cGF0aW9uIjp7ImNvZGUiOiJvMiIsInRpdGxlIjoiTnVyc2UifX0seyJpZCI6NSwibmFtZSI6IkV2ZSBEYXZpcyIsImFnZSI6NDIsInNjaG9vbCI6eyJjb2RlIjoiczEiLCJuYW1lIjoiSGFydmFyZCJ9fSx7ImlkIjo2LCJuYW1lIjoiRnJhbmsgTWlsbGVyIiwiYWdlIjoyNSwic2Nob29sIjp7ImNvZGUiOiJzMiIsIm5hbWUiOiJZZWlsIn19LHsiaWQiOjcsIm5hbWUiOiJHcmFjZSBXaWxzb24iLCJhZ2UiOjIyLCJzY2hvb2wiOnsiY29kZSI6InMzIiwibmFtZSI6Ik1JVCJ9fSx7ImlkIjo4LCJuYW1lIjoiSGFuayBUYXlsb3IiLCJhZ2UiOjE1LCJzY2hvb2wiOnsiY29kZSI6InMxIiwibmFtZSI6IkhhcnZhcmQifX1d";
const tables = {
  nextIndex: 9,
  users: JSON.parse(atob(obfuscatedUserData)) as UserInfoSchema[],
};

export async function POST(request: NextRequest) {
  const data = await request.json();
  const nextIndex = tables.nextIndex++;
  const { occupation: occupationSrc, school: schoolSrc, name = "unknown", age = 0 } = data as UserInfoInput;
  const occupation = occupationSrc
    ? {
        occupation: {
          code: "c1",
          title: occupationSrc,
        },
      }
    : {};

  const school = schoolSrc
    ? {
        school: {
          code: "c1",
          name: schoolSrc,
        },
      }
    : {};
  const newData: UserInfoSchema = { id: nextIndex, name, age: Number(age), ...occupation, ...school };
  tables.users = [...tables.users, newData];
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return Response.json({ data: newData });
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const limit = Number(searchParams.get("limit") ?? "3");
  const searchAgeOver = searchParams.get("s-age-over") ?? "";
  const searchAgeUnder = searchParams.get("s-age-under") ?? "";
  const searchOccupation = searchParams.get("s-occupation") ?? "";
  const searchSchool = searchParams.get("s-school") ?? "";
  let filtered = tables.users;
  if (searchAgeOver) {
    filtered = filtered.filter((user) => user.age >= Number(searchAgeOver));
  }
  if (searchAgeUnder) {
    filtered = filtered.filter((user) => user.age <= Number(searchAgeUnder));
  }
  if (searchOccupation) {
    filtered = filtered.filter((user) => user.occupation?.title.includes(searchOccupation.toString()));
  }
  if (searchSchool) {
    filtered = filtered.filter((user) => user.school?.name.includes(searchSchool.toString()));
  }
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return Response.json({ data: filtered.slice(0, limit) });
}
